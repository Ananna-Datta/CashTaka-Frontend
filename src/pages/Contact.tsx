import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate form submission delay
    setTimeout(() => {
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-background text-foreground">
      {/* Header */}
      <section className="w-full py-16 bg-gradient-to-r from-primary/10 to-primary/5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Have a question or inquiry? We’d love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* Form Section */}
      <section className="max-w-lg w-full py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-md">
            <CardContent className="p-6">
              {!submitted ? (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="block mb-2 font-medium">Name</label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium">Message</label>
                    <Textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Write your message"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Inquiry
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-6"
                >
                  <h2 className="text-2xl font-semibold text-primary mb-2">
                    Thank you!
                  </h2>
                  <p className="text-muted-foreground">
                    Your inquiry has been received. We'll get back to you soon.
                  </p>
                  <Button
                    className="mt-4"
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                  >
                    Submit Another
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
