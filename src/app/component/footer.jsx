import React from 'react'
import Image from 'next/image';

export default function Footer() {
  return (
    <section className="border-t pt-8 pb-44 ">
      <div className="flex items-center gap-4 flex-col font-sans font-medium text-gray-600 ">
        <p>© 2024 All rights reserved </p>
        <div className='relative bg-white'>
          <Image
            src="/payment.png"
            width={200}
            height={200}
            className='w-auto'
            alt="payment method"
            priority
          />
        </div>
      </div>
    </section>
  );
}
