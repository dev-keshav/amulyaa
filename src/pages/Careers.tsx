import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Briefcase, MapPin } from 'lucide-react';

const applySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  resume_url: z.string().url('Please enter a valid URL'),
  cover_letter: z.string().min(20, 'At least 20 characters'),
});

type ApplyData = z.infer<typeof applySchema>;

const Careers = () => {
  const [applyingTo, setApplyingTo] = useState<string | null>(null);
  const form = useForm<ApplyData>({ resolver: zodResolver(applySchema) });

  const { data: jobs, isLoading } = useQuery({
    queryKey: ['job-listings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('job_listings').select('*').eq('is_active', true);
      if (error) throw error;
      return data;
    },
  });

  const onSubmit = async (data: ApplyData) => {
    if (!applyingTo) return;
    const { error } = await supabase.from('job_applications').insert([{
      name: data.name,
      email: data.email,
      resume_url: data.resume_url,
      cover_letter: data.cover_letter,
      job_id: applyingTo,
    }]);
    if (error) { toast.error('Failed to submit. Please try again.'); return; }
    toast.success('Application submitted!');
    form.reset();
    setApplyingTo(null);
  };

  return (
    <div className="container py-16 px-4 max-w-3xl">
      <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Join Atelier</h1>
      <p className="text-muted-foreground mb-12">Help us bring original art to the world. Open positions below.</p>

      {isLoading ? (
        <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />)}</div>
      ) : !jobs?.length ? (
        <p className="text-muted-foreground py-12 text-center">No open positions right now. Check back soon!</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="font-serif text-xl font-semibold text-foreground">{job.title}</h2>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{job.department} · {job.type}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                  </div>
                </div>
                <Dialog open={applyingTo === job.id} onOpenChange={(open) => { if (!open) setApplyingTo(null); }}>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setApplyingTo(job.id)}>Apply</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Apply for {job.title}</DialogTitle></DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="resume_url" render={({ field }) => (
                          <FormItem><FormLabel>Resume URL</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="cover_letter" render={({ field }) => (
                          <FormItem><FormLabel>Cover Letter</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Submit Application</Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{job.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Careers;
