import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import team1 from "@/assets/images/Banner/Banner.png";
import team2 from "@/assets/images/Team/Team2.png";
import team3 from "@/assets/images/Team/Team3.png";

const About = () => {
  const teamMembers = [
    { name: "Ananna Datta", role: "Frontend Developer", img: team1 },
    { name: "John Smith", role: "Backend Engineer", img: team2 },
    { name: "Sara Lee", role: "UI/UX Designer", img: team3 },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-background text-foreground">
      {/* 🌟 Hero Section */}
      <section className="w-full py-16 bg-gradient-to-r from-primary/10 to-primary/5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            We’re a passionate team dedicated to empowering users through
            technology and innovation.
          </p>
        </motion.div>
      </section>

      {/* 🧩 Our Story */}
      <section className="max-w-6xl w-full py-16 px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-primary">
            Our Story
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Founded with a vision to create impactful digital experiences, our
            journey began as a small team of developers with big dreams. Over
            the years, we’ve grown into a dynamic company helping businesses and
            individuals transform their ideas into reality.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
            alt="Our story"
            className="rounded-2xl shadow-xl w-full object-cover"
          />
        </motion.div>
      </section>

      {/* 🎯 Mission Section */}
      <section className="w-full py-16 bg-primary/5 text-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-semibold mb-4 text-primary">
            Our Mission
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our mission is to deliver accessible, high-quality digital solutions
            that make a difference. We strive to build products that not only
            solve real problems but also inspire creativity, inclusivity, and
            trust.
          </p>
        </motion.div>
      </section>

      {/* 👥 Team Section */}
      <section className="max-w-6xl w-full py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10 text-primary">
          Meet Our Team
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="hover:shadow-xl hover:scale-[1.03] transition-transform duration-300">
                <CardContent className="flex flex-col items-center p-6">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mb-4 shadow-md border-2 border-primary/20"
                  />
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;