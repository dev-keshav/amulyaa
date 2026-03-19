import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Clock, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import PageHero from '@/components/layout/PageHero';
import Reveal from '@/components/animation/Reveal';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

const contactItems = [
  {
    icon: MapPin,
    title: 'Studio location',
    text: '123 Gallery Lane, Art District, New York, NY 10001',
  },
  {
    icon: Clock,
    title: 'Studio hours',
    text: 'Monday to Friday - 10am to 6pm\nSaturday - 11am to 4pm',
  },
  {
    icon: Mail,
    title: 'Email',
    text: 'hello@amulyaa.art',
  },
];

const Contact = () => {
  const form = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log('Contact form:', data);
    toast.success("Message sent. We'll get back to you soon.");
    form.reset();
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the studio about a piece, placement, or commission."
        description="Use the form for artwork questions, trade enquiries, styling guidance, or commission availability."
        aside={(
          <div className="surface-panel-muted p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Response window
            </p>
            <p className="mt-4 font-serif text-4xl text-foreground">24-48 hrs</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              For urgent installation or shipping questions, include the artwork title in your subject line.
            </p>
          </div>
        )}
      />

      <section className="container px-2 pb-16 md:px-3">
        <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
          <Reveal>
            <div className="surface-panel p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea rows={6} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/92">
                    Send message
                  </Button>
                </form>
              </Form>
            </div>
          </Reveal>

          <div className="space-y-5">
            {contactItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <div className="surface-panel-muted p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/12">
                      <item.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-3xl text-foreground">{item.title}</h2>
                      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
