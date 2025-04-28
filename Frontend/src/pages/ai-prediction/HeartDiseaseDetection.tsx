import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, AlertTriangle, Check } from 'lucide-react';

const HeartDiseaseDetection = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
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
      const response = await fetch('/api/predict/heart', {
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
          <Heart className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            Heart Disease Risk Assessment
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Enter patient information to assess heart disease risk
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
                Sex
              </label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                className="w-full"
                required
              >
                <option value="">Select Sex</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
            Clinical Measurements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Chest Pain Type (0-3)
              </label>
              <select
                name="cp"
                value={formData.cp}
                onChange={handleInputChange}
                className="w-full"
                required
              >
                <option value="">Select Type</option>
                <option value="0">Typical Angina</option>
                <option value="1">Atypical Angina</option>
                <option value="2">Non-anginal Pain</option>
                <option value="3">Asymptomatic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Resting Blood Pressure
              </label>
              <input
                type="number"
                name="trestbps"
                value={formData.trestbps}
                onChange={handleInputChange}
                className="w-full"
                required
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Fasting Blood Sugar {'>'} 120 mg/dl
              </label>
              <select
                name="fbs"
                value={formData.fbs}
                onChange={handleInputChange}
                className="w-full"
                required
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Resting ECG Results
              </label>
              <select
                name="restecg"
                value={formData.restecg}
                onChange={handleInputChange}
                className="w-full"
                required
              >
                <option value="">Select Result</option>
                <option value="0">Normal</option>
                <option value="1">ST-T Wave Abnormality</option>
                <option value="2">Left Ventricular Hypertrophy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Maximum Heart Rate
              </label>
              <input
                type="number"
                name="thalach"
                value={formData.thalach}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Exercise Induced Angina
              </label>
              <select
                name="exang"
                value={formData.exang}
                onChange={handleInputChange}
                className="w-full"
                required
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                ST Depression
              </label>
              <input
                type="number"
                name="oldpeak"
                value={formData.oldpeak}
                onChange={handleInputChange}
                className="w-full"
                required
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Slope of Peak Exercise ST Segment
              </label>
              <select
                name="slope"
                value={formData.slope}
                onChange={handleInputChange}
                className="w-full"
                required
              >
                <option value="">Select Slope</option>
                <option value="0">Upsloping</option>
                <option value="1">Flat</option>
                <option value="2">Downsloping</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Number of Major Vessels
              </label>
              <select
                name="ca"
                value={formData.ca}
                onChange={handleInputChange}
                className="w-full"
                required
              >
                <option value="">Select Number</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Thalassemia
              </label>
              <select
                name="thal"
                value={formData.thal}
                onChange={handleInputChange}
                className="w-full"
                required
              >
                <option value="">Select Type</option>
                <option value="1">Normal</option>
                <option value="2">Fixed Defect</option>
                <option value="3">Reversible Defect</option>
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
                {prediction.result ? 'High Risk of Heart Disease' : 'Low Risk of Heart Disease'}
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
                  <li>Schedule immediate cardiology consultation</li>
                  <li>Consider stress test and additional cardiac imaging</li>
                  <li>Review and adjust cardiovascular risk factors</li>
                  <li>Develop emergency action plan</li>
                </>
              ) : (
                <>
                  <li>Maintain heart-healthy lifestyle</li>
                  <li>Regular exercise and balanced diet</li>
                  <li>Monitor blood pressure and cholesterol</li>
                  <li>Schedule routine check-ups</li>
                </>
              )}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HeartDiseaseDetection;