import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as Lungs, AlertTriangle, Check } from 'lucide-react';

const AsthmaDetection = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    ethnicity: '',
    educationLevel: '',
    bmi: '',
    smoking: '',
    physicalActivity: '',
    dietQuality: '',
    sleepQuality: '',
    pollutionExposure: '',
    pollenExposure: '',
    dustExposure: '',
    petAllergy: '',
    familyHistoryAsthma: '',
    historyOfAllergies: '',
    eczema: '',
    hayFever: '',
    gastroesophagealReflux: '',
    lungFunctionFEV1: '',
    lungFunctionFVC: '',
    wheezing: '',
    shortnessOfBreath: '',
    chestTightness: '',
    coughing: '',
    nighttimeSymptoms: '',
    exerciseInduced: ''
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
      const response = await fetch('/api/predict/asthma', {
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
        <div className="p-3 bg-primary-100 dark:bg-primary-900/20 text-primary-500 rounded-lg mr-4">
          <Lungs className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            Asthma Risk Assessment
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Enter patient information to assess asthma risk
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
            {/* Add other personal information fields */}
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
            Medical History
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Add medical history fields */}
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
            Symptoms & Measurements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Add symptoms and measurements fields */}
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
                {prediction.result ? 'High Risk of Asthma' : 'Low Risk of Asthma'}
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
                  <li>Schedule a follow-up appointment for detailed assessment</li>
                  <li>Consider pulmonary function testing</li>
                  <li>Monitor symptoms closely</li>
                  <li>Avoid known triggers</li>
                </>
              ) : (
                <>
                  <li>Continue regular health check-ups</li>
                  <li>Maintain healthy lifestyle habits</li>
                  <li>Report any new respiratory symptoms</li>
                </>
              )}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AsthmaDetection;