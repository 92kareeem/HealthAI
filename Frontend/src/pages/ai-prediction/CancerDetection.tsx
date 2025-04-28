import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, Check } from 'lucide-react';

const CancerDetection = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    bmi: '',
    smoking: '0',
    geneticRisk: '0',
    physicalActivity: '',
    alcoholIntake: '0',
    cancerHistory: '0'
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
      const response = await fetch('/api/predict/cancer', {
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
        <div className="p-3 bg-error-100 dark:bg-error-900/20 text-error-500 rounded-lg mr-4">
          <Activity className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            Cancer Risk Assessment
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Enter patient information to assess cancer risk
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
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full"
                required
                min="0"
                max="120"
              />
            </div>
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
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
                min="10"
                max="50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Physical Activity (hours/week)
              </label>
              <input
                type="number"
                name="physicalActivity"
                value={formData.physicalActivity}
                onChange={handleInputChange}
                className="w-full"
                required
                min="0"
                max="168"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
            Risk Factors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Smoking Status
              </label>
              <select
                name="smoking"
                value={formData.smoking}
                onChange={handleInputChange}
                className="w-full"
                required
              >
                <option value="0">Non-Smoker</option>
                <option value="1">Smoker</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Genetic Risk Level
              </label>
              <select
                name="geneticRisk"
                value={formData.geneticRisk}
                onChange={handleInputChange}
                className="w-full"
                required
              >
                <option value="0">Low</option>
                <option value="1">Medium</option>
                <option value="2">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Alcohol Intake
              </label>
              <select
                name="alcoholIntake"
                value={formData.alcoholIntake}
                onChange={handleInputChange}
                className="w-full"
                required
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Family Cancer History
              </label>
              <select
                name="cancerHistory"
                value={formData.cancerHistory}
                onChange={handleInputChange}
                className="w-full"
                required
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
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
                {prediction.result ? 'High Risk of Cancer' : 'Low Risk of Cancer'}
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
                  <li>Schedule comprehensive cancer screening</li>
                  <li>Consult with an oncologist</li>
                  <li>Consider genetic counseling</li>
                  <li>Develop a monitoring plan</li>
                </>
              ) : (
                <>
                  <li>Continue regular health check-ups</li>
                  <li>Maintain healthy lifestyle habits</li>
                  <li>Follow recommended cancer screening guidelines</li>
                  <li>Report any concerning symptoms promptly</li>
                </>
              )}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CancerDetection;