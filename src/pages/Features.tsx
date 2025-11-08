import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Shield, Users, Smartphone, Cloud, Zap } from "lucide-react";

const features = [
  {
    icon: <Rocket className="w-10 h-10 text-primary" />,
    title: "Fast & Reliable",
    desc: "Experience lightning-fast load times and a smooth user interface optimized for performance.",
  },
  {
    icon: <Shield className="w-10 h-10 text-primary" />,
    title: "Secure Platform",
    desc: "We prioritize your data with top-tier encryption and modern authentication mechanisms.",
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: "User Collaboration",
    desc: "Connect and collaborate seamlessly with other users and agents through interactive tools.",
  },
  {
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    title: "Mobile Friendly",
    desc: "Enjoy a fully responsive experience that works perfectly across all devices and screen sizes.",
  },
  {
    icon: <Cloud className="w-10 h-10 text-primary" />,
    title: "Cloud Sync",
    desc: "All your data stays synchronized and backed up safely in the cloud in real-time.",
  },
  {
    icon: <Zap className="w-10 h-10 text-primary" />,
    title: "Instant Updates",
    desc: "Stay up-to-date with live updates and notifications that keep you in the loop.",
  },
];

const Features = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full py-16 bg-gradient-to-r from-primary/10 to-primary/5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Features</h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Explore the core features that make our platform powerful, secure, and easy to use.
          </p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl w-full py-16 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 border border-border">
                <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
                  <div className="bg-primary/10 p-4 rounded-full">{feature.icon}</div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Features;
