import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { MapPin, Clock, Mail } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

const Contact = () => {
  const form = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log('Contact form:', data);
    toast.success('Message sent! We\'ll get back to you soon.');
    form.reset();
  };

  return (
    <div className="container py-16 px-4">
      <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Get in Touch</h1>
      <p className="text-muted-foreground mb-12 max-w-lg">Questions about a painting, custom commissions, or just want to say hello? We'd love to hear from you.</p>

      <div className="grid gap-16 lg:grid-cols-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="subject" render={({ field }) => (
              <FormItem><FormLabel>Subject</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="message" render={({ field }) => (
              <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea rows={5} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">Send Message</Button>
          </form>
        </Form>

        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <MapPin className="h-5 w-5 text-accent mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Studio Location</h3>
              <p className="text-sm text-muted-foreground">123 Gallery Lane, Art District<br />New York, NY 10001</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock className="h-5 w-5 text-accent mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Studio Hours</h3>
              <p className="text-sm text-muted-foreground">Mon–Fri: 10am – 6pm<br />Sat: 11am – 4pm<br />Sun: Closed</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="h-5 w-5 text-accent mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Email</h3>
              <p className="text-sm text-muted-foreground">hello@atelier-art.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
