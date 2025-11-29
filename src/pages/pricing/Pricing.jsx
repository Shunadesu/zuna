import { FiCode, FiLayers, FiRocket, FiCheck, FiArrowRight } from 'react-icons/fi'
import { useCTA } from '../../context/CTAContext'
import AnimatedBackground from '../../components/backgrounds/AnimatedBackground'
import SectionHeader from '../../components/ui/SectionHeader'
import PricingCard from '../../components/ui/PricingCard'
import GlassCard from '../../components/ui/GlassCard'

const Pricing = () => {
  const { openCTA } = useCTA()

  const pricingPlans = [
    {
      plan: 'Basic',
      name: 'Starter Package',
      price: '$2,999',
      period: 'project',
      description: 'Perfect for small businesses and startups looking to establish their online presence',
      icon: FiCode,
      iconColor: '#06b6d4',
      features: [
        'Up to 5 pages website',
        'Responsive design (Mobile, Tablet, Desktop)',
        'Basic SEO optimization',
        'Contact form integration',
        'Social media integration',
        'Basic analytics setup',
        '1 month free support',
        'Source code delivery',
        'Basic documentation'
      ]
    },
    {
      plan: 'Professional',
      name: 'Business Package',
      price: '$5,999',
      period: 'project',
      description: 'Ideal for growing businesses that need advanced features and functionality',
      icon: FiLayers,
      iconColor: '#8b5cf6',
      popular: true,
      features: [
        'Up to 15 pages website',
        'Custom design & branding',
        'Advanced SEO optimization',
        'Content Management System (CMS)',
        'E-commerce integration (up to 50 products)',
        'Payment gateway integration',
        'User authentication system',
        'Advanced analytics & reporting',
        '3 months free support',
        'Source code delivery',
        'Comprehensive documentation',
        'Performance optimization',
        'Security features'
      ]
    },
    {
      plan: 'Enterprise',
      name: 'Premium Package',
      price: 'Custom',
      period: null,
      description: 'Tailored solutions for large enterprises with complex requirements',
      icon: FiRocket,
      iconColor: '#ec4899',
      features: [
        'Unlimited pages',
        'Fully custom design & development',
        'Enterprise-grade SEO',
        'Advanced CMS with custom features',
        'Full e-commerce solution',
        'Multiple payment gateways',
        'Advanced user management',
        'API integration',
        'Third-party integrations',
        'Custom features & functionality',
        '6 months free support',
        'Priority support & maintenance',
        'Source code delivery',
        'Full documentation & training',
        'Performance & security optimization',
        'Scalable architecture',
        'Dedicated project manager'
      ]
    }
  ]

  const additionalServices = [
    {
      title: 'Domain & Hosting',
      description: 'We can help you set up and manage your domain and hosting',
      price: 'Starting at $99/year'
    },
    {
      title: 'Maintenance & Updates',
      description: 'Ongoing maintenance, updates, and technical support',
      price: 'Starting at $199/month'
    },
    {
      title: 'SEO Services',
      description: 'Advanced SEO optimization and content strategy',
      price: 'Starting at $299/month'
    },
    {
      title: 'Custom Features',
      description: 'Additional custom features and functionality',
      price: 'Custom pricing'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white relative py-32">
      <AnimatedBackground variant="purple" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <SectionHeader
          title="Web Development Pricing"
          subtitle="Choose the perfect package for your business needs. All packages include modern design, responsive layout, and professional development."
        />

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

        {/* Additional Services */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="section-title">Additional Services</h2>
            <div className="h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full w-24 mx-auto mb-6" />
            <p className="section-subtitle">
              Enhance your website with our additional services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {additionalServices.map((service, index) => (
              <GlassCard key={index} className="group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-300">
                      {service.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="text-lg font-bold text-gradient">{service.price}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full w-24 mx-auto mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'What is included in the price?',
                a: 'All packages include design, development, responsive layout, basic SEO, and source code delivery. Higher packages include additional features like CMS, e-commerce, and extended support.'
              },
              {
                q: 'How long does development take?',
                a: 'Basic package: 2-3 weeks, Professional: 4-6 weeks, Enterprise: 8-12 weeks. Timeline depends on project complexity and requirements.'
              },
              {
                q: 'Do you provide hosting?',
                a: 'We can help you set up hosting and domain. Hosting is available as an additional service starting at $99/year.'
              },
              {
                q: 'Can I upgrade my package later?',
                a: 'Yes, you can upgrade to a higher package at any time. We will adjust the pricing accordingly.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept bank transfers, credit cards, and PayPal. Payment terms are typically 50% upfront and 50% upon completion.'
              },
              {
                q: 'Do you offer maintenance after launch?',
                a: 'Yes, we offer maintenance and support packages starting at $199/month. All packages include free support for the specified period.'
              }
            ].map((faq, index) => (
              <GlassCard key={index}>
                <h3 className="text-lg font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                  {faq.q}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <GlassCard className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-white/60 max-w-2xl mx-auto">
              Let's discuss your project and find the perfect solution for your business
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={openCTA}
                className="btn-primary inline-flex items-center gap-2"
              >
                Get a Free Quote <FiArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={openCTA}
                className="btn-secondary inline-flex items-center gap-2"
              >
                Schedule a Consultation <FiCheck className="w-5 h-5" />
              </button>
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  )
}

export default Pricing

