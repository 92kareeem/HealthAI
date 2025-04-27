import { useState, useRef } from 'react';
import { Upload, Camera, Brain, ChevronRight, Check, ArrowRight, File, ImageIcon, AlertTriangle, Heart, Settings as Lungs, Droplet, X, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Disease = 'heart' | 'diabetes' | 'asthma' | 'cancer' | 'kidney';

const AIDiseasePrediction = () => {
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [step, setStep] = useState<'select-disease' | 'upload' | 'result'>('select-disease');
  const [uploadMethod, setUploadMethod] = useState<'camera' | 'file' | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analyzingProgress, setAnalyzingProgress] = useState(0);
  const [result, setResult] = useState<'positive' | 'negative' | 'inconclusive' | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const diseases = [
    {
      id: 'heart',
      name: 'Heart Disease',
      icon: <Heart className="h-6 w-6 text-error-500" />,
      description: 'Analyze patient data to predict risk of cardiovascular disease.',
      uploadTypes: ['file', 'camera'],
      color: 'border-error-500 bg-error-500/5',
      accuracy: '92% accuracy',
    },
    {
      id: 'diabetes',
      name: 'Diabetes',
      icon: <Droplet className="h-6 w-6 text-primary-500" />,
      description: 'Predict diabetes risk based on patient data and clinical parameters.',
      uploadTypes: ['file'],
      color: 'border-primary-500 bg-primary-500/5',
      accuracy: '89% accuracy',
    },
    {
      id: 'asthma',
      name: 'Asthma',
      icon: <Lungs className="h-6 w-6 text-secondary-500" />,
      description: 'Assess respiratory patterns to identify asthma risk and severity.',
      uploadTypes: ['file', 'camera'],
      color: 'border-secondary-500 bg-secondary-500/5',
      accuracy: '87% accuracy',
    },
    {
      id: 'cancer',
      name: 'Cancer Detection',
      icon: <Activity className="h-6 w-6 text-warning-500" />,
      description: 'Analyze images to detect potential cancerous cells and markers.',
      uploadTypes: ['file', 'camera'],
      color: 'border-warning-500 bg-warning-500/5',
      accuracy: '91% accuracy',
    },
    {
      id: 'kidney',
      name: 'Kidney Stone',
      icon: <Activity className="h-6 w-6 text-accent-500" />,
      description: 'Detect and analyze kidney stones from medical imaging.',
      uploadTypes: ['file', 'camera'],
      color: 'border-accent-500 bg-accent-500/5',
      accuracy: '90% accuracy',
    }
  ];

  const handleDiseaseSelect = (disease: Disease) => {
    setSelectedDisease(disease);
    setStep('upload');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate file upload process
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        simulateAnalysis();
      }
    }, 200);
  };

  const simulateAnalysis = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setAnalyzingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        // Random result for demonstration
        const results = ['positive', 'negative', 'inconclusive'] as const;
        const randomResult = results[Math.floor(Math.random() * 3)];
        
        setResult(randomResult);
        setConfidence(randomResult === 'inconclusive' ? 65 : Math.floor(Math.random() * 20) + 80);
        setStep('result');
      }
    }, 200);
  };

  const resetProcess = () => {
    setSelectedDisease(null);
    setStep('select-disease');
    setUploadMethod(null);
    setIsUploading(false);
    setUploadProgress(0);
    setAnalyzingProgress(0);
    setResult(null);
    setConfidence(0);
    setShowCamera(false);
  };

  const selectedDiseaseObj = selectedDisease ? diseases.find(d => d.id === selectedDisease) : null;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-accent-100 dark:bg-accent-900/20 text-accent-500 rounded-lg mr-4">
          <Brain className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            AI Disease Prediction
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Use advanced AI models to assist in disease diagnosis and prediction
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'select-disease' || step === 'upload' || step === 'result' ? 'bg-primary-500 text-white' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'}`}>
              <Check className="h-5 w-5" />
            </div>
            <div className={`h-1 w-16 ${step === 'upload' || step === 'result' ? 'bg-primary-500' : 'bg-neutral-200 dark:bg-neutral-700'}`}></div>
          </div>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'upload' || step === 'result' ? 'bg-primary-500 text-white' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'}`}>
              {step === 'upload' || step === 'result' ? <Check className="h-5 w-5" /> : '2'}
            </div>
            <div className={`h-1 w-16 ${step === 'result' ? 'bg-primary-500' : 'bg-neutral-200 dark:bg-neutral-700'}`}></div>
          </div>
          <div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'result' ? 'bg-primary-500 text-white' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'}`}>
              {step === 'result' ? <Check className="h-5 w-5" /> : '3'}
            </div>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-primary-500 font-medium">Select Disease</span>
          <span className={step === 'upload' || step === 'result' ? 'text-primary-500 font-medium' : 'text-neutral-500 dark:text-neutral-400'}>Upload Data</span>
          <span className={step === 'result' ? 'text-primary-500 font-medium' : 'text-neutral-500 dark:text-neutral-400'}>Results</span>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm">
        {step === 'select-disease' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
              Select a Disease for AI Prediction
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {diseases.map((disease) => (
                <motion.div
                  key={disease.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${disease.color}`}
                  whileHover={{ y: -5 }}
                  onClick={() => handleDiseaseSelect(disease.id as Disease)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="mt-1">{disease.icon}</div>
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-neutral-900 dark:text-white">
                          {disease.name}
                        </h3>
                        <ChevronRight className="h-5 w-5 text-neutral-400" />
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        {disease.description}
                      </p>
                      <div className="flex items-center mt-2">
                        <span className="text-xs bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded text-neutral-600 dark:text-neutral-300">
                          {disease.accuracy}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {step === 'upload' && selectedDiseaseObj && (
          <div className="p-6">
            <button 
              onClick={() => setStep('select-disease')}
              className="flex items-center text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 mb-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Back to disease selection
            </button>
            
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-neutral-100 dark:bg-neutral-700 rounded-full mb-4">
                {selectedDiseaseObj.icon}
              </div>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                {selectedDiseaseObj.name} Prediction
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                {selectedDiseaseObj.description}
              </p>
            </div>

            {!uploadMethod && !isUploading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
                {selectedDiseaseObj.uploadTypes.includes('file') && (
                  <motion.div
                    className="border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg p-6 text-center cursor-pointer hover:border-primary-400 dark:hover:border-primary-400"
                    whileHover={{ y: -5 }}
                    onClick={() => {
                      setUploadMethod('file');
                      fileInputRef.current?.click();
                    }}
                  >
                    <div className="bg-neutral-100 dark:bg-neutral-700 p-4 rounded-full inline-block mb-3">
                      <File className="h-6 w-6 text-primary-500" />
                    </div>
                    <h3 className="font-medium text-neutral-900 dark:text-white mb-2">Upload File</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Upload patient data, lab results, or medical imaging
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".csv,.json,.jpg,.jpeg,.png,.dicom"
                    />
                  </motion.div>
                )}

                {selectedDiseaseObj.uploadTypes.includes('camera') && (
                  <motion.div
                    className="border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-lg p-6 text-center cursor-pointer hover:border-primary-400 dark:hover:border-primary-400"
                    whileHover={{ y: -5 }}
                    onClick={() => {
                      setUploadMethod('camera');
                      setShowCamera(true);
                    }}
                  >
                    <div className="bg-neutral-100 dark:bg-neutral-700 p-4 rounded-full inline-block mb-3">
                      <Camera className="h-6 w-6 text-primary-500" />
                    </div>
                    <h3 className="font-medium text-neutral-900 dark:text-white mb-2">Use Camera</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Take a photo of results or medical imaging
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {(isUploading || uploadProgress > 0) && (
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {uploadProgress < 100 ? 'Uploading...' : 'Processing...'}
                  </span>
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {uploadProgress < 100 ? `${uploadProgress}%` : `${analyzingProgress}%`}
                  </span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5">
                  <div
                    className="bg-primary-500 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress < 100 ? uploadProgress : analyzingProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                  {uploadProgress < 100 
                    ? 'Uploading your file. Please wait...' 
                    : 'Analyzing data with our advanced AI models...'}
                </p>
              </div>
            )}
          </div>
        )}

        {step === 'result' && result && (
          <div className="p-6">
            <button 
              onClick={resetProcess}
              className="flex items-center text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300 mb-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Start new prediction
            </button>

            <div className="text-center mb-8">
              <div className={`inline-block p-4 rounded-full mb-4 ${
                result === 'positive' 
                  ? 'bg-error-100 dark:bg-error-900/20 text-error-500' 
                  : result === 'negative'
                    ? 'bg-success-100 dark:bg-success-900/20 text-success-500'
                    : 'bg-warning-100 dark:bg-warning-900/20 text-warning-500'
              }`}>
                {result === 'positive' 
                  ? <AlertTriangle className="h-8 w-8" />
                  : result === 'negative'
                    ? <Check className="h-8 w-8" />
                    : <AlertTriangle className="h-8 w-8" />
                }
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                {result === 'positive' 
                  ? `${selectedDiseaseObj?.name} Detected` 
                  : result === 'negative'
                    ? `${selectedDiseaseObj?.name} Not Detected`
                    : 'Results Inconclusive'
                }
              </h2>
              <p className={`text-lg font-medium mt-2 ${
                result === 'positive' 
                  ? 'text-error-600 dark:text-error-400' 
                  : result === 'negative'
                    ? 'text-success-600 dark:text-success-400'
                    : 'text-warning-600 dark:text-warning-400'
              }`}>
                {confidence}% Confidence
              </p>
            </div>

            <div className="max-w-lg mx-auto">
              <div className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-6 mb-6">
                <h3 className="font-medium text-neutral-900 dark:text-white mb-4">AI Analysis Summary</h3>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                  {result === 'positive'
                    ? `Our AI model has detected patterns consistent with ${selectedDiseaseObj?.name} with ${confidence}% confidence. It's recommended to conduct further clinical tests to confirm the diagnosis.`
                    : result === 'negative'
                      ? `Our AI model didn't detect patterns associated with ${selectedDiseaseObj?.name} with ${confidence}% confidence. However, always consult with healthcare professionals for a comprehensive assessment.`
                      : `Our AI model couldn't reach a conclusive result for ${selectedDiseaseObj?.name}. This could be due to insufficient data or low-quality inputs. Please try again with different or higher-quality data.`
                  }
                </p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <button className={`px-4 py-2 rounded-md ${
                    result === 'positive'
                      ? 'bg-error-500 text-white hover:bg-error-600'
                      : result === 'negative'
                        ? 'bg-success-500 text-white hover:bg-success-600'
                        : 'bg-warning-500 text-white hover:bg-warning-600'
                  }`}>
                    View Detailed Report
                  </button>
                  <button className="px-4 py-2 bg-neutral-200 dark:bg-neutral-600 text-neutral-800 dark:text-neutral-200 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-500">
                    Download Results
                  </button>
                </div>
              </div>

              <div className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-6">
                <h3 className="font-medium text-neutral-900 dark:text-white mb-4">Next Steps</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-white dark:bg-neutral-800 p-1 rounded-full mt-0.5 mr-3">
                      <Check className="h-4 w-4 text-success-500" />
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Schedule a follow-up appointment to discuss these results
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white dark:bg-neutral-800 p-1 rounded-full mt-0.5 mr-3">
                      <Check className="h-4 w-4 text-success-500" />
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      {result === 'positive' 
                        ? 'Order additional clinical tests to confirm diagnosis'
                        : result === 'negative'
                          ? 'Consider other potential causes for symptoms'
                          : 'Consider retaking tests with higher quality data'
                      }
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white dark:bg-neutral-800 p-1 rounded-full mt-0.5 mr-3">
                      <Check className="h-4 w-4 text-success-500" />
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Share results with patient through secure platform
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Camera Modal */}
      <AnimatePresence>
        {showCamera && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-xl w-full max-w-lg"
            >
              <div className="p-4 bg-neutral-100 dark:bg-neutral-900 flex justify-between items-center">
                <h3 className="font-medium text-neutral-900 dark:text-white">Take a Photo</h3>
                <button 
                  className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  onClick={() => setShowCamera(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="aspect-video bg-black relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white">Camera view (simulated)</p>
                </div>
                {/* This would be a real camera view in a production app */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="border-2 border-white/70 rounded-lg w-1/2 h-1/2"></div>
                </div>
              </div>
              <div className="p-4 flex justify-between">
                <button 
                  className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-md"
                  onClick={() => setShowCamera(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-primary-500 text-white rounded-md"
                  onClick={() => {
                    setShowCamera(false);
                    setIsUploading(true);
                    setUploadProgress(100);
                    simulateAnalysis();
                  }}
                >
                  Capture
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIDiseasePrediction;