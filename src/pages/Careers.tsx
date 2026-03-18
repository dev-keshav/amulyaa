import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Briefcase, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import PageHero from '@/components/layout/PageHero';
import Reveal from '@/components/animation/Reveal';
import { jobListings } from '@/data/job-listings';

const applySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  resume_url: z.string().url('Please enter a valid URL'),
  cover_letter: z.string().min(20, 'At least 20 characters'),
});

type ApplyData = z.infer<typeof applySchema>;

const Careers = () => {
  const [applyingTo, setApplyingTo] = useState<string | null>(null);
  const form = useForm<ApplyData>({ resolver: zodResolver(applySchema) });
  const jobs = jobListings.filter((job) => job.isActive);

  const onSubmit = async (_data: ApplyData) => {
    if (!applyingTo) return;

    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success('Application submitted.');
    form.reset();
    setApplyingTo(null);
  };

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Help shape the studio experience behind each release."
        description="Amulyaa looks for operators, storytellers, and client-facing collaborators who care about detail, hospitality, and thoughtful presentation."
        stats={[
          { label: 'Open roles', value: `${jobs.length}` },
          { label: 'Team style', value: 'Hybrid' },
          { label: 'Focus', value: 'Art + service' },
        ]}
      />

      <section className="container px-4 pb-16">
        {!jobs.length ? (
          <div className="surface-panel px-6 py-16 text-center">
            <p className="font-serif text-4xl text-foreground">No open roles right now.</p>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
              We update this page when new studio, operations, or client experience positions open.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {jobs.map((job, index) => (
              <Reveal key={job.id} delay={index * 0.06}>
                <div className="surface-panel p-6 md:p-8">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-2xl">
                      <h2 className="font-serif text-4xl text-foreground">{job.title}</h2>
                      <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="info-chip">
                          <Briefcase className="h-4 w-4" />
                          {job.department} - {job.type}
                        </span>
                        <span className="info-chip">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                      </div>
                      <p className="mt-5 text-sm leading-7 text-muted-foreground">{job.description}</p>
                    </div>

                    <Dialog
                      open={applyingTo === job.id}
                      onOpenChange={(open) => {
                        if (!open) setApplyingTo(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setApplyingTo(job.id)}>
                          Apply now
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Apply for {job.title}</DialogTitle>
                        </DialogHeader>

                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="resume_url"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Resume URL</FormLabel>
                                  <FormControl>
                                    <Input placeholder="https://..." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="cover_letter"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Cover letter</FormLabel>
                                  <FormControl>
                                    <Textarea rows={5} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <Button
                              type="submit"
                              className="w-full bg-accent text-accent-foreground hover:bg-accent/92"
                            >
                              Submit application
                            </Button>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Careers;
