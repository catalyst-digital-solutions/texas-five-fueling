'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';

export default function TestComponentsPage() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState('');

  const handleButtonClick = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 2000);
  };

  const selectOptions = [
    { value: 'diesel-generator', label: 'Diesel Generator Refueling' },
    { value: 'equipment-refueling', label: 'Equipment Refueling' },
    { value: 'job-site-delivery', label: 'Job Site Fuel Delivery' },
    { value: 'shop-fueling', label: 'Shop Fueling Services' },
    { value: 'def-refilling', label: 'DEF Re-filling' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">UI Components Test Page</h1>
          <p className="text-gray-600">Test all UI components with various states and configurations</p>
        </div>

        {/* Button Component Tests */}
        <section className="bg-white shadow-sm rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Button Component</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Sizes</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button size="sm">Small Button</Button>
                <Button size="md">Medium Button</Button>
                <Button size="lg">Large Button</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">States</h3>
              <div className="flex flex-wrap gap-4">
                <Button loading={buttonLoading} onClick={handleButtonClick}>
                  {buttonLoading ? 'Loading...' : 'Click to Load'}
                </Button>
                <Button disabled>Disabled Button</Button>
                <Button type="submit">Submit Button</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Input Component Tests */}
        <section className="bg-white shadow-sm rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Input Component</h2>
          
          <div className="space-y-4">
            <Input
              label="Standard Input"
              name="standard"
              placeholder="Enter text..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <Input
              label="Required Input"
              name="required"
              placeholder="This field is required"
              required
            />

            <Input
              label="Input with Error"
              name="error"
              placeholder="Error state"
              error="This field has an error"
            />

            <Input
              label="Input with Success"
              name="success"
              placeholder="Success state"
              success
            />

            <Input
              label="Loading Input"
              name="loading"
              placeholder="Loading state"
              loading
            />
          </div>
        </section>

        {/* Textarea Component Tests */}
        <section className="bg-white shadow-sm rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Textarea Component</h2>
          
          <div className="space-y-4">
            <Textarea
              label="Standard Textarea"
              name="standard-textarea"
              placeholder="Enter your message..."
              maxLength={500}
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
            />

            <Textarea
              label="Textarea with Error"
              name="error-textarea"
              placeholder="Error state"
              error="This textarea has an error"
            />

            <Textarea
              label="Textarea with Success"
              name="success-textarea"
              placeholder="Success state"
              success
            />
          </div>
        </section>

        {/* Select Component Tests */}
        <section className="bg-white shadow-sm rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Component</h2>
          
          <div className="space-y-4">
            <Select
              label="Standard Select"
              name="standard-select"
              options={selectOptions}
              placeholder="Select a service type..."
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
            />

            <Select
              label="Select with Error"
              name="error-select"
              options={selectOptions}
              placeholder="Error state"
              error="Please select an option"
            />

            <Select
              label="Select with Success"
              name="success-select"
              options={selectOptions}
              placeholder="Success state"
              success
            />

            <Select
              label="Loading Select"
              name="loading-select"
              options={[]}
              placeholder="Loading state"
              loading
            />
          </div>
        </section>

        {/* Form Example */}
        <section className="bg-white shadow-sm rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Form Example</h2>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Name"
              name="form-name"
              placeholder="Enter your name"
              required
            />

            <Input
              label="Email"
              name="form-email"
              type="email"
              placeholder="Enter your email"
              required
            />

            <Input
              label="Phone"
              name="form-phone"
              type="tel"
              placeholder="Enter your phone number"
              required
            />

            <Select
              label="Service Type"
              name="form-service"
              options={selectOptions}
              placeholder="Select a service"
              required
            />

            <Textarea
              label="Message"
              name="form-message"
              placeholder="Enter your message"
              maxLength={500}
            />

            <div className="flex gap-4">
              <Button type="submit" variant="primary" size="lg">
                Submit Form
              </Button>
              <Button type="button" variant="secondary" size="lg">
                Cancel
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

