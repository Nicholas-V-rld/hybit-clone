import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <>
      <Navigation />
      
      <section id="hero">
        <Hero />
      </section>
      
      <section id="contact">
        <ContactForm />
      </section>
    </>
  );
}
