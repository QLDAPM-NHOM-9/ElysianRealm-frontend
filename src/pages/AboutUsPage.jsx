import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center max-w-3xl">
      <h1 className="text-4xl font-bold text-brand-primary mb-6 font-serif">Về Elysian Realm</h1>
      <p className="text-lg text-text-secondary mb-8">
        Elysian Realm không chỉ là một nền tảng đặt vé, mà là người bạn đồng hành đưa bạn đến những giấc mơ. 
        Chúng tôi tin rằng mỗi chuyến đi là một hành trình khám phá bản thân và thế giới.
      </p>
      <img 
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80" 
        alt="Team" 
        className="w-full rounded-2xl shadow-lg mb-8"
      />
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-text-primary">2022</h3>
          <p className="text-text-secondary">Năm thành lập</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-text-primary">100+</h3>
          <p className="text-text-secondary">Điểm đến</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-text-primary">50k+</h3>
          <p className="text-text-secondary">Khách hàng hài lòng</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;