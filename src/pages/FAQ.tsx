import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    question: "How do I register as a User or Agent?",
    answer:
      "You can register from the Sign-Up page and select your role — either 'User' or 'Agent' — from the dropdown.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Absolutely. We use secure authentication and encryption to protect your data and privacy.",
  },
  {
    question: "Can I access my account on mobile?",
    answer:
      "Yes, our platform is fully responsive and optimized for both mobile and desktop use.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can use our Contact page to send us a message directly. We usually respond within 24 hours.",
  },
];

const FAQ = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full py-16 bg-gradient-to-r from-primary/10 to-primary/5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground">
            Find answers to the most common questions about our services.
          </p>
        </motion.div>
      </section>

      {/* FAQ List */}
      <section className="max-w-4xl w-full py-16 px-6 space-y-6">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default FAQ;
