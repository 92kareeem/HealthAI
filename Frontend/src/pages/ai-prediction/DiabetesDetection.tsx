import { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplet, AlertTriangle, Check } from 'lucide-react';

const DiabetesDetection = () => {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    urea: '',
    cr: '',
    hba1c: '',
    chol: '',
    tg: '',
    hdl: '',
    ldl: '',
    vldl: '',
    bmi: ''
  });

  const [prediction, setPrediction] = useState<null | {
    result: boolean;
    confidence: number;
  }>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/predict/diabetes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-warning-100 dark:bg-warning-900/20 text-warning-500 rounded-lg mr-4">
          <Droplet className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            Diabetes Risk Assessment
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Enter patient information to assess diabetes risk
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full"
                required
              >
                <option value="">Select Gender</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                BMI
              </label>
              <input
                type="number"
                name="bmi"
                value={formData.bmi}
                onChange={handleInputChange}
                className="w-full"
                required
                step="0.1"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
            Blood Test Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Urea Level
              </label>
              <input
                type="number"
                name="urea"
                value={formData.urea}
                onChange={handleInputChange}
                className="w-full"
                required
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Creatinine (Cr)
              </label>
              <input
                type="number"
                name="cr"
                value={formData.cr}
                onChange={handleInputChange}
                className="w-full"
                required
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                HbA1c
              </label>
              <input
                type="number"
                name="hba1c"
                value={formData.hba1c}
                onChange={handleInputChange}
                className="w-full"
                required
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Cholesterol
              </label>
              <input
                type="number"
                name="chol"
                value={formData.chol}
                onChange={handleInputChange}
                className="w-full"
                required
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Triglycerides
              </label>
              <input
                type="number"
                name="tg"
                value={formData.tg}
                onChange={handleInputChange}
                className="w-full"
                required
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                HDL
              </label>
              <input
                type="number"
                name="hdl"
                value={formData.hdl}
                onChange={handleInputChange}
                className="w-full"
                required
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                LDL
              </label>
              <input
                type="number"
                name="ldl"
                value={formData.ldl}
                onChange={handleInputChange}
                className="w-full"
                required
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                VLDL
              </label>
              <input
                type="number"
                name="vldl"
                value={formData.vldl}
                onChange={handleInputChange}
                className="w-full"
                required
                step="0.1"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Get Prediction'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-error-50 dark:bg-error-900/20 text-error-600 dark:text-error-400 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            {error}
          </div>
        </div>
      )}

      {prediction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center mb-4">
            {prediction.result ? (
              <div className="p-3 bg-error-100 dark:bg-error-900/20 text-error-500 rounded-full">
                <AlertTriangle className="h-6 w-6" />
              </div>
            ) : (
              <div className="p-3 bg-success-100 dark:bg-success-900/20 text-success-500 rounded-full">
                <Check className="h-6 w-6" />
              </div>
            )}
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                {prediction.result ? 'High Risk of Diabetes' : 'Low Risk of Diabetes'}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Confidence: {prediction.confidence}%
              </p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
            <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
              Recommendations:
            </h4>
            <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400">
              {prediction.result ? (
                <>
                  <li>Schedule follow-up tests to confirm diagnosis</li>
                  <li>Consider glucose tolerance test</li>
                  <li>Review diet and lifestyle factors</li>
                  <li>Monitor blood sugar levels regularly</li>
                </>
              ) : (
                <>
                  <li>Maintain healthy diet and exercise routine</li>
                  <li>Continue regular check-ups</li>
                  <li>Monitor blood sugar periodically</li>
                  <li>Stay aware of diabetes risk factors</li>
                </>
              )}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DiabetesDetection;