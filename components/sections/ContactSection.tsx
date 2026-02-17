"use client";

import { forwardRef } from "react";
import TerminalWindow from "@/components/TerminalWindow";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(50, "Message must be at least 50 characters"),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactSectionProps {}

const ContactSection = forwardRef<HTMLElement, ContactSectionProps>((props, ref) => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      console.error("Contact form error:", error);
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    contactMutation.mutate(data);
  };

  return (
    <section ref={ref} id="contact" className="min-h-screen flex items-center justify-center py-8 md:py-12 px-4">
      <TerminalWindow title="contact.js">
        <div className="mb-4">
          <span className="text-terminal-green">$</span>{" "}
          <span className="text-terminal-command">touch</span> ./messages/new_message.json
        </div>
        <div className="ml-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-terminal-accent">
            Get In Touch
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="mb-6">I'm always open to new opportunities and collaborations. Feel free to reach out!</p>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-terminal-lightbg flex items-center justify-center mr-3 flex-shrink-0">
                    <i className="ri-mail-line text-terminal-accent"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-400">Email</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('tanishpoddar.18@gmail.com');
                        toast({
                          title: "Email copied!",
                          description: "tanishpoddar.18@gmail.com copied to clipboard",
                        });
                      }}
                      className="text-terminal-accent hover:text-terminal-green transition-colors text-sm break-all text-left"
                    >
                      tanishpoddar.18@gmail.com
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-terminal-lightbg flex items-center justify-center mr-3 flex-shrink-0">
                    <i className="ri-linkedin-box-line text-terminal-accent"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-400">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/tanisheesh/" target="_blank" rel="noreferrer" className="text-terminal-accent hover:text-terminal-green transition-colors text-sm break-all">
                      linkedin.com/in/tanisheesh
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-terminal-lightbg flex items-center justify-center mr-3 flex-shrink-0">
                    <i className="ri-github-line text-terminal-accent"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-400">GitHub</p>
                    <a href="https://github.com/tanisheesh" target="_blank" rel="noreferrer" className="text-terminal-accent hover:text-terminal-green transition-colors text-sm break-all">
                      github.com/tanisheesh
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-terminal-lightbg p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-terminal-accent">Response Time</h3>
                <p className="text-sm">I typically respond to all messages within 24-48 hours. Looking forward to connecting with you!</p>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">
                          <span className="text-terminal-green">const</span>{" "}
                          <span className="text-terminal-accent">name</span> =
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Your Name"
                            className="w-full bg-terminal-lightbg border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-terminal-accent"
                          />
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
                        <FormLabel className="text-sm">
                          <span className="text-terminal-green">const</span>{" "}
                          <span className="text-terminal-accent">email</span> ={" "}
                          {field.value && (
                            <span className="text-xs ml-2">
                              {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value) ? (
                                <span className="text-terminal-green">✓ valid</span>
                              ) : (
                                <span className="text-red-400">✗ invalid</span>
                              )}
                            </span>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="your.email@example.com"
                            className="w-full bg-terminal-lightbg border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-terminal-accent"
                          />
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
                        <FormLabel className="text-sm">
                          <span className="text-terminal-green">const</span>{" "}
                          <span className="text-terminal-accent">subject</span> =
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Subject"
                            className="w-full bg-terminal-lightbg border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-terminal-accent"
                          />
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
                        <FormLabel className="text-sm">
                          <span className="text-terminal-green">const</span>{" "}
                          <span className="text-terminal-accent">message</span> ={" "}
                          <span className="text-xs text-gray-400">({field.value.length}/50 min)</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={5}
                            placeholder="Your message here..."
                            className="w-full bg-terminal-lightbg border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-terminal-accent resize-none overflow-y-auto custom-scrollbar"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="bg-terminal-accent text-terminal-bg px-6 py-3 rounded-md hover:bg-terminal-accent/90 transition-colors flex items-center w-full justify-center disabled:opacity-50"
                  >
                    <span className="mr-2">
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </span>
                    {!contactMutation.isPending && <i className="ri-send-plane-line"></i>}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
          
          <div>
            <span className="text-terminal-green">$</span>{" "}
            <span className="text-terminal-command">echo</span> "Thank you for visiting my portfolio!"
          </div>
        </div>
      </TerminalWindow>
    </section>
  );
});

ContactSection.displayName = "ContactSection";

export default ContactSection;
