import { Home } from 'lucide-react'
import Image from 'next/image'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const EverythingAboutSection: React.FC = () => {
    return (
        <section id='about-pulse-architects' className="py-20">
            <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
                <div className="grid lg:grid-cols-2 gap-10">
                    <div className='lg:mx-0 mx-auto'>
                        <Image
                            src="/images/about/pulse-architects-building.jpg"
                            alt='Pulse Architects Office Building'
                            width={680}
                            height={644}
                            className='lg:w-full rounded-2xl'
                        />
                    </div>
                    <div className='lg:px-12'>
                        <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2">
                            <Home className="text-2xl text-primary" />
                            About Us
                        </p>
                        <h2 className='lg:text-52 text-40 leading-[1.2] font-medium text-dark dark:text-white'>
                            Everything about Pulse Architects
                        </h2>
                        <p className='text-dark/50 dark:text-white/50 pr-20'>
                            We know that designing and building your dream space can be complex. Here are some frequently asked questions to help guide you through our architectural design process and services.
                        </p>
                        <div className="my-8">
                            <Accordion type="single" defaultValue="item-1" collapsible className="w-full flex flex-col gap-6">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>1. Can I customize architectural plans?</AccordionTrigger>
                                    <AccordionContent>
                                        Absolutely! All our architectural plans can be customized to meet your specific needs, site requirements, and design preferences. Our team of licensed architects will work with you to modify existing plans or create completely custom designs.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>2. What's included in the architectural plans?</AccordionTrigger>
                                    <AccordionContent>
                                        Our comprehensive architectural packages include floor plans, elevations, sections, construction details, structural drawings, electrical layouts, plumbing plans, and material specifications. We also provide 3D visualizations and building permit ready documents.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>3. How long does the design process take?</AccordionTrigger>
                                    <AccordionContent>
                                        Standard plan modifications typically take 2-3 weeks, while completely custom designs can take 6-12 weeks depending on complexity. We provide detailed timelines during our initial consultation and keep you updated throughout the design process.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4">
                                    <AccordionTrigger>4. Do you provide construction support?</AccordionTrigger>
                                    <AccordionContent>
                                        Yes! We offer construction administration services including contractor selection assistance, construction document review, site visits, and quality control inspections to ensure your project is built according to our designs and specifications.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EverythingAboutSection;