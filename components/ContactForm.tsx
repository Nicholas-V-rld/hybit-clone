'use client';

import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
    // Form submission logic will be added later
  };

  return (
    <section 
      id="contact" 
      className="min-h-[132vh] bg-black relative py-[100px] px-[40px]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0) 100%),
          repeating-linear-gradient(0deg, transparent, transparent 44px, rgba(255,255,255,0.05) 44px, rgba(255,255,255,0.05) 45px),
          repeating-linear-gradient(90deg, transparent, transparent 44px, rgba(255,255,255,0.05) 44px, rgba(255,255,255,0.05) 45px)
        `
      }}
    >
      {/* Content - Centered */}
      <div className="max-w-md mx-auto relative z-10 flex flex-col items-center justify-center min-h-[calc(132vh-200px)]">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[50px] font-bold text-white leading-[60px] tracking-[-2.1px] text-center mb-12"
        >
          Kontakt
        </motion.h2>
        
        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)} 
          className="space-y-6 w-full"
        >
          {/* Name and Email in a row */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label htmlFor="name" className="block text-sm font-normal text-white mb-2">
                Name
              </label>
              <motion.input
                type="text"
                id="name"
                {...register('name', { required: 'Name ist erforderlich' })}
                whileFocus={{ borderColor: "rgba(255,255,255,0.4)", scale: 1.01 }}
                className="w-full h-[40px] bg-gray-900/70 border border-white/20 text-sm font-normal text-white placeholder:text-gray-400 px-4 py-3 rounded-lg focus:border-white/40 focus:outline-none transition-all duration-200"
                placeholder="Jane Smith"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="email" className="block text-sm font-normal text-white mb-2">
                Email
              </label>
              <motion.input
                type="email"
                id="email"
                {...register('email', { 
                  required: 'Email ist erforderlich',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Ungültige Email-Adresse'
                  }
                })}
                whileFocus={{ borderColor: "rgba(255,255,255,0.4)", scale: 1.01 }}
                className="w-full h-[40px] bg-gray-900/70 border border-white/20 text-sm font-normal text-white placeholder:text-gray-400 px-4 py-3 rounded-lg focus:border-white/40 focus:outline-none transition-all duration-200"
                placeholder="jane@framer.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>
          
          {/* Message textarea */}
          <div>
            <label htmlFor="message" className="block text-sm font-normal text-white mb-2">
              Message
            </label>
            <motion.textarea
              id="message"
              {...register('message', { required: 'Nachricht ist erforderlich' })}
              whileFocus={{ borderColor: "rgba(255,255,255,0.4)", scale: 1.01 }}
              className="w-full h-[100px] bg-gray-900/70 border border-white/20 text-sm font-normal text-white placeholder:text-gray-400 px-4 py-3 rounded-lg focus:border-white/40 focus:outline-none resize-none transition-all duration-200"
              placeholder="Your message..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>
          
          {/* Submit button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(120, 131, 233, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full h-[40px] bg-[rgb(120,131,233)] text-white text-sm font-semibold rounded-lg hover:bg-[rgb(100,111,213)] transition-all duration-300"
          >
            Submit
          </motion.button>
        </motion.form>
      </div>
      
      {/* Footer with Logo */}
      <footer className="absolute bottom-[100px] left-0 right-0 text-center z-10">
        <div className="flex items-center justify-center gap-3">
          <Image
            src="/hybit-logo.png"
            alt="Hybit logo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
          />
          <span className="text-4xl font-medium text-white">hybit.</span>
        </div>
      </footer>
    </section>
  );
}