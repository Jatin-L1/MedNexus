// "use client";
// import { useState, useEffect } from 'react';

// const DiseasePredictor = () => {
//   const [patientName, setPatientName] = useState('');
//   const [selectedSymptoms, setSelectedSymptoms] = useState(['', '', '', '', '']);
//   const [predictions, setPredictions] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [scanProgress, setScanProgress] = useState(0);
//   const [isInitialized, setIsInitialized] = useState(false);

//   const symptoms = [
//     'back_pain','constipation','abdominal_pain','diarrhoea','mild_fever','yellow_urine',
// 'yellowing_of_eyes','acute_liver_failure','fluid_overload','swelling_of_stomach',
// 'swelled_lymph_nodes','malaise','blurred_and_distorted_vision','phlegm','throat_irritation',
// 'redness_of_eyes','sinus_pressure','runny_nose','congestion','chest_pain','weakness_in_limbs',
// 'fast_heart_rate','pain_during_bowel_movements','pain_in_anal_region','bloody_stool',
// 'irritation_in_anus','neck_pain','dizziness','cramps','bruising','obesity','swollen_legs',
// 'swollen_blood_vessels','puffy_face_and_eyes','enlarged_thyroid','brittle_nails',
// 'swollen_extremeties','excessive_hunger','extra_marital_contacts','drying_and_tingling_lips',
// 'slurred_speech','knee_pain','hip_joint_pain','muscle_weakness','stiff_neck','swelling_joints',
// 'movement_stiffness','spinning_movements','loss_of_balance','unsteadiness',
// 'weakness_of_one_body_side','loss_of_smell','bladder_discomfort','foul_smell_of urine',
// 'continuous_feel_of_urine','passage_of_gases','internal_itching','toxic_look_(typhos)',
// 'depression','irritability','muscle_pain','altered_sensorium','red_spots_over_body','belly_pain',
// 'abnormal_menstruation','dischromic _patches','watering_from_eyes','increased_appetite','polyuria',
// 'family_history','mucoid_sputum','rusty_sputum','lack_of_concentration','visual_disturbances',
// 'receiving_blood_transfusion','receiving_unsterile_injections','coma','stomach_bleeding',
// 'distention_of_abdomen','history_of_alcohol_consumption','fluid_overload','blood_in_sputum',
// 'prominent_veins_on_calf','palpitations','painful_walking','pus_filled_pimples','blackheads',
// 'scurring','skin_peeling','silver_like_dusting','small_dents_in_nails','inflammatory_nails',
// 'blister','red_sore_around_nose','yellow_crust_ooze'
//   ];

//   useEffect(() => {
//     setIsInitialized(true);
//   }, []);

//   useEffect(() => {
//     if (isLoading) {
//       const interval = setInterval(() => {
//         setScanProgress(prev => (prev + 1) % 100);
//       }, 30);
//       return () => clearInterval(interval);
//     } else {
//       setScanProgress(0);
//     }
//   }, [isLoading]);

//   const handlePredict = async () => {
//     try {
//       setIsLoading(true);
//       setError('');
//       const validSymptoms = selectedSymptoms.filter(s => s !== '');
      
//       if (validSymptoms.length === 0) {
//         setError('Please select at least one symptom');
//         return;
//       }

//       const response = await fetch('http://localhost:5000/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           symptoms: validSymptoms
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       setPredictions(data.predictions); // Update to match backend response structure
//     } catch (error) {
//       setError('Failed to get predictions. Please try again.');
//       console.error('Error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderPredictionCard = (title, prediction) => (
//     <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-6 relative overflow-hidden group hover:border-cyan-400 transition-colors">
//       <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
//       <h3 className="text-cyan-400 text-sm mb-2 uppercase tracking-wider">
//         {title.replace(/([A-Z])/g, ' $1').trim()} Model
//       </h3>
//       <p className="text-2xl font-bold text-white mb-2">{prediction}</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-black text-cyan-400 p-6 relative overflow-hidden">
//       {/* Space background with stars */}
//       <div className="fixed inset-0 z-0">
//         {[...Array(100)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full bg-white animate-twinkle"
//             style={{
//               width: Math.random() * 3 + 'px',
//               height: Math.random() * 3 + 'px',
//               top: Math.random() * 100 + '%',
//               left: Math.random() * 100 + '%',
//               animationDelay: Math.random() * 5 + 's',
//             }}
//           />
//         ))}
//       </div>

//       <div className={`max-w-4xl mx-auto relative z-10 transition-all duration-1000 ${isInitialized ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-5xl font-bold mb-4 animate-glow">
//             <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
//               STELLAR MEDICAL DIAGNOSTICS
//             </span>
//           </h1>
//           <p className="text-cyan-500 text-lg">QUANTUM-POWERED DISEASE ANALYSIS • V2.0</p>
//         </div>

//         {/* Main Interface */}
//         <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8">
//           {/* Symptoms Selection */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             {selectedSymptoms.map((symptom, index) => (
//               <div key={index} className="relative">
//                 <label className="block text-cyan-400 text-sm mb-2 uppercase tracking-wider">
//                   Symptom {index + 1}
//                 </label>
//                 <select
//                   value={symptom}
//                   onChange={(e) => {
//                     const newSymptoms = [...selectedSymptoms];
//                     newSymptoms[index] = e.target.value;
//                     setSelectedSymptoms(newSymptoms);
//                   }}
//                   disabled={isLoading}
//                   className="w-full bg-black/50 border-2 border-cyan-500/30 rounded-lg p-4 text-cyan-400"
//                 >
//                   <option value="">SELECT SYMPTOM</option>
//                   {symptoms.map(s => (
//                     <option key={s} value={s} className="bg-gray-900">
//                       {s.replace(/_/g, ' ').toUpperCase()}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             ))}
//           </div>

//           {/* Progress and Error */}
//           {isLoading && (
//             <div className="mb-6">
//               <div className="h-1 bg-cyan-950 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
//                   style={{ width: `${scanProgress}%` }}
//                 />
//               </div>
//               <div className="mt-2 text-center text-cyan-500 text-sm">
//                 ANALYZING: {scanProgress}%
//               </div>
//             </div>
//           )}

//           {error && (
//             <div className="mb-6 bg-red-900/20 border-2 border-red-500/30 rounded-lg p-4 text-red-400">
//               {error}
//             </div>
//           )}

//           {/* Predict Button */}
//           <button
//             onClick={handlePredict}
//             disabled={isLoading}
//             className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white p-4 rounded-lg font-bold transition-all disabled:opacity-50"
//           >
//             {isLoading ? 'ANALYZING...' : 'DIAGNOSE'}
//           </button>

//           {/* Results Display */}
//           {predictions && (
//             <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
//               {renderPredictionCard('decisionTree', predictions.decisionTree)}
//               {renderPredictionCard('randomForest', predictions.randomForest)}
//               {renderPredictionCard('naiveBayes', predictions.naiveBayes)}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DiseasePredictor;




// above code is the react code for the disease predictor page below code is for expermentation


// "use client";
// import { useState, useEffect } from 'react';
// import { Sparkles, Activity, Brain, AlertCircle } from 'lucide-react';

// const DiseasePredictor = () => {
//   const [selectedSymptoms, setSelectedSymptoms] = useState(['', '', '', '', '']);
//   const [predictions, setPredictions] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [scanProgress, setScanProgress] = useState(0);
//   const [isInitialized, setIsInitialized] = useState(false);

//   const symptoms = [
//     'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever',
//     'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload',
//     'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision',
//     'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose',
//     'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate'
//   ];

//   useEffect(() => {
//     setIsInitialized(true);
//   }, []);

//   useEffect(() => {
//     if (isLoading) {
//       const interval = setInterval(() => {
//         setScanProgress(prev => {
//           if (prev >= 99) return 99;
//           return prev + 1;
//         });
//       }, 30);
//       return () => clearInterval(interval);
//     } else {
//       setScanProgress(0);
//     }
//   }, [isLoading]);

//   const handleSymptomChange = (index, value) => {
//     const newSymptoms = [...selectedSymptoms];
//     newSymptoms[index] = value;
//     setSelectedSymptoms(newSymptoms);
//   };

//   const handlePredict = async () => {
//     try {
//       setIsLoading(true);
//       setError('');
//       const validSymptoms = selectedSymptoms.filter(s => s !== '');
      
//       if (validSymptoms.length === 0) {
//         setError('Please select at least one symptom');
//         setIsLoading(false);
//         return;
//       }

//       const response = await fetch('http://localhost:5000/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ symptoms: validSymptoms }),
//       });

//       if (!response.ok) throw new Error('Network response was not ok');

//       const data = await response.json();
//       setPredictions(data.predictions);
//     } catch (error) {
//       setError('Failed to get predictions. Please try again.');
//       console.error('Error:', error);
//     } finally {
//       setIsLoading(false);
//       setScanProgress(100);
//     }
//   };

//   const renderPredictionCard = (modelName, prediction) => {
//     const modelIcons = {
//       decisionTree: Brain,
//       randomForest: Activity,
//       naiveBayes: Sparkles
//     };
    
//     const Icon = modelIcons[modelName] || AlertCircle;
    
//     const confidenceColor = prediction.confidence >= 70 
//       ? 'from-green-400 to-green-500'
//       : prediction.confidence >= 40
//         ? 'from-yellow-400 to-yellow-500'
//         : 'from-red-400 to-red-500';

//     return (
//       <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/30 rounded-xl p-6 relative overflow-hidden group hover:border-cyan-400 transition-all duration-300">
//         <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        
//         <div className="flex items-center gap-3 mb-4">
//           <Icon className="w-6 h-6 text-cyan-400" />
//           <h3 className="text-cyan-400 text-sm uppercase tracking-wider">
//             {modelName.replace(/([A-Z])/g, ' $1').trim()}
//           </h3>
//         </div>
        
//         <p className="text-2xl font-bold text-white mb-4">
//           {prediction.disease}
//         </p>
        
//         <div className="space-y-4">
//           <div>
//             <div className="flex justify-between items-center text-sm mb-1">
//               <span className="text-cyan-400">Confidence</span>
//               <span className="text-white font-medium">{prediction.confidence}%</span>
//             </div>
//             <div className="w-full bg-slate-700/50 rounded-full h-2">
//               <div 
//                 className={`bg-gradient-to-r ${confidenceColor} h-2 rounded-full transition-all duration-500`}
//                 style={{ width: `${prediction.confidence}%` }}
//               />
//             </div>
//           </div>

//           <div>
//             <div className="flex justify-between items-center text-sm mb-1">
//               <span className="text-cyan-400">Model Accuracy</span>
//               <span className="text-white font-medium">{prediction.accuracy}%</span>
//             </div>
//             <div className="w-full bg-slate-700/50 rounded-full h-2">
//               <div 
//                 className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-500"
//                 style={{ width: `${prediction.accuracy}%` }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-cyan-400 p-6">
//       {/* Star field background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute inset-0 bg-[radial-gradient(white,rgba(255,255,255,.2)_2px,transparent_40px)] bg-slate-950 opacity-50" 
//              style={{backgroundSize: "200px 200px"}} />
//       </div>

//       <div className={`max-w-4xl mx-auto relative z-10 transition-all duration-1000 ${isInitialized ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-block">
//             <h1 className="text-5xl font-bold mb-4 relative">
//               <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
//                 QUANTUM DIAGNOSIS
//               </span>
//               <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-30 blur-lg -z-10" />
//             </h1>
//           </div>
//           <p className="text-cyan-500 text-lg">NEXT-GEN AI POWERED MEDICAL ANALYSIS • V3.0</p>
//         </div>

//         {/* Main Interface */}
//         <div className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 shadow-xl">
//           {/* Symptoms Selection */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             {selectedSymptoms.map((symptom, index) => (
//               <div key={index} className="relative group">
//                 <label className="block text-cyan-400 text-sm mb-2 uppercase tracking-wider">
//                   Symptom {index + 1}
//                 </label>
//                 <select
//                   value={symptom}
//                   onChange={(e) => handleSymptomChange(index, e.target.value)}
//                   disabled={isLoading}
//                   className="w-full bg-slate-800/50 border-2 border-cyan-500/30 rounded-lg p-4 text-white focus:border-cyan-400 transition-all duration-300 outline-none group-hover:border-cyan-400/50"
//                 >
//                   <option value="">Select Symptom</option>
//                   {symptoms
//                     .filter(s => !selectedSymptoms.includes(s) || s === symptom)
//                     .map(s => (
//                       <option key={s} value={s} className="bg-slate-800">
//                         {s.replace(/_/g, ' ').toUpperCase()}
//                       </option>
//                     ))}
//                 </select>
//               </div>
//             ))}
//           </div>

//           {/* Progress Bar */}
//           {isLoading && (
//             <div className="mb-6">
//               <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
//                   style={{ width: `${scanProgress}%` }}
//                 />
//               </div>
//               <div className="mt-2 text-center text-cyan-500 text-sm">
//                 ANALYZING SYMPTOMS: {scanProgress}%
//               </div>
//             </div>
//           )}

//           {/* Error Display */}
//           {error && (
//             <div className="mb-6 bg-red-900/20 border-2 border-red-500/30 rounded-lg p-4 text-red-400">
//               {error}
//             </div>
//           )}

//           {/* Predict Button */}
//           <button
//             onClick={handlePredict}
//             disabled={isLoading}
//             className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white p-4 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative group"
//           >
//             <span className="relative z-10">
//               {isLoading ? 'ANALYZING...' : 'DIAGNOSE'}
//             </span>
//             <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity rounded-lg" />
//           </button>

//           {/* Results Display */}
//           {predictions && (
//             <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//               {Object.entries(predictions).map(([model, prediction]) => 
//                 renderPredictionCard(model, prediction)
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DiseasePredictor;






















// "use client";
// import { useState, useEffect } from 'react';
// import { Sparkles, Activity, Brain, AlertCircle, Scan, Loader2 } from 'lucide-react';

// const DiseasePredictor = () => {
//   const [selectedSymptoms, setSelectedSymptoms] = useState(['', '', '', '', '']);
//   const [predictions, setPredictions] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [scanProgress, setScanProgress] = useState(0);
//   const [isInitialized, setIsInitialized] = useState(false);
//   const [activeCard, setActiveCard] = useState(null);

//   const symptoms = [
//     'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever',
//     'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload',
//     'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision',
//     'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose',
//     'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate'
//   ];

//   useEffect(() => {
//     const timer = setTimeout(() => setIsInitialized(true), 100);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (isLoading) {
//       const interval = setInterval(() => {
//         setScanProgress(prev => {
//           if (prev >= 99) return 99;
//           return prev + 1;
//         });
//       }, 30);
//       return () => clearInterval(interval);
//     } else {
//       setScanProgress(0);
//     }
//   }, [isLoading]);

//   const handleSymptomChange = (index, value) => {
//     const newSymptoms = [...selectedSymptoms];
//     newSymptoms[index] = value;
//     setSelectedSymptoms(newSymptoms);
//   };

//   const handlePredict = async () => {
//     try {
//       setIsLoading(true);
//       setError('');
//       setPredictions(null);
//       const validSymptoms = selectedSymptoms.filter(s => s !== '');
      
//       if (validSymptoms.length === 0) {
//         setError('Please select at least one symptom');
//         setIsLoading(false);
//         return;
//       }

//       const response = await fetch('http://localhost:5000/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ symptoms: validSymptoms }),
//       });

//       if (!response.ok) throw new Error('Network response was not ok');

//       const data = await response.json();
//       setPredictions(data.predictions);
//     } catch (error) {
//       setError('Failed to get predictions. Please try again.');
//       console.error('Error:', error);
//     } finally {
//       setIsLoading(false);
//       setScanProgress(100);
//     }
//   };

//   const renderPredictionCard = (modelName, prediction, index) => {
//     const modelIcons = {
//       decisionTree: Brain,
//       randomForest: Activity,
//       naiveBayes: Sparkles
//     };
    
//     const Icon = modelIcons[modelName] || AlertCircle;
//     const isActive = activeCard === modelName;
    
//     const getConfidenceColor = (confidence) => {
//       if (confidence >= 70) return 'bg-gradient-to-r from-emerald-400 to-emerald-500';
//       if (confidence >= 40) return 'bg-gradient-to-r from-amber-400 to-amber-500';
//       return 'bg-gradient-to-r from-rose-400 to-rose-500';
//     };

//     return (
//       <div 
//         className={`transition-all duration-500 ease-out transform ${
//           predictions ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//         }`}
//         style={{ transitionDelay: `${index * 100}ms` }}
//       >
//         <div 
//           className={`bg-gradient-to-br from-slate-900 to-slate-800 border-2 rounded-xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300 
//             ${isActive ? 'border-cyan-400 scale-105' : 'border-cyan-500/30 hover:border-cyan-400/50'}`}
//           onClick={() => setActiveCard(isActive ? null : modelName)}
//         >
//           <div className="flex items-center gap-3 mb-4">
//             <Icon className="w-6 h-6 text-cyan-400" />
//             <h3 className="text-cyan-400 text-sm uppercase tracking-wider font-medium">
//               {modelName.replace(/([A-Z])/g, ' $1').trim()}
//             </h3>
//           </div>
          
//           <p className="text-2xl font-bold text-white mb-4">
//             {prediction.disease}
//           </p>
          
//           <div className="space-y-4">
//             <div className="transition-all duration-300">
//               <div className="flex justify-between items-center text-sm mb-1">
//                 <span className="text-cyan-400">Confidence Level</span>
//                 <span className="text-white font-medium">{prediction.confidence}%</span>
//               </div>
//               <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
//                 <div 
//                   className={`h-full transition-all duration-1000 ease-out ${getConfidenceColor(prediction.confidence)}`}
//                   style={{ width: `${prediction.confidence}%` }}
//                 />
//               </div>
//             </div>

//             <div className="transition-all duration-300">
//               <div className="flex justify-between items-center text-sm mb-1">
//                 <span className="text-cyan-400">Model Accuracy</span>
//                 <span className="text-white font-medium">{prediction.accuracy}%</span>
//               </div>
//               <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
//                 <div 
//                   className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000 ease-out"
//                   style={{ width: `${prediction.accuracy}%` }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-cyan-400 p-6">
//       <div className="max-w-4xl mx-auto relative z-10">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-600 text-transparent bg-clip-text">
//             STELLAR DIAGNOSTICS
//           </h1>
//           <p className="text-cyan-400 text-lg font-medium tracking-wider">
//             QUANTUM-POWERED MEDICAL ANALYSIS • VERSION 4.0
//           </p>
//         </div>

//         {/* Main Interface */}
//         <div className="bg-slate-900/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 shadow-2xl">
//           {/* Symptoms Selection */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             {selectedSymptoms.map((symptom, index) => (
//               <div key={index} className="relative">
//                 <label className="block text-cyan-400 text-sm mb-2 uppercase tracking-wider font-medium">
//                   Symptom {index + 1}
//                 </label>
//                 <div className="relative">
//                   <select
//                     value={symptom}
//                     onChange={(e) => handleSymptomChange(index, e.target.value)}
//                     disabled={isLoading}
//                     className="w-full bg-slate-800/50 border-2 border-cyan-500/30 rounded-lg p-4 text-white focus:border-cyan-400 transition-all duration-300 outline-none appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <option value="">Select Symptom</option>
//                     {symptoms
//                       .filter(s => !selectedSymptoms.includes(s) || s === symptom)
//                       .map(s => (
//                         <option key={s} value={s} className="bg-slate-800">
//                           {s.replace(/_/g, ' ').toUpperCase()}
//                         </option>
//                       ))}
//                   </select>
//                   <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none">
//                     ▼
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Progress Bar */}
//           {isLoading && (
//             <div className="mb-6">
//               <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
//                   style={{ width: `${scanProgress}%` }}
//                 />
//               </div>
//               <div className="mt-3 text-center text-cyan-400 text-sm font-medium flex items-center justify-center gap-2">
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 ANALYZING SYMPTOMS: {scanProgress}%
//               </div>
//             </div>
//           )}

//           {/* Error Display */}
//           {error && (
//             <div className="mb-6 bg-red-900/20 border-2 border-red-500/30 rounded-lg p-4 text-red-400">
//               <div className="flex items-center gap-2">
//                 <AlertCircle className="w-5 h-5" />
//                 {error}
//               </div>
//             </div>
//           )}

//           {/* Predict Button */}
//           <button
//             onClick={handlePredict}
//             disabled={isLoading}
//             className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 
//                      text-white p-4 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 
//                      disabled:cursor-not-allowed relative overflow-hidden"
//           >
//             <span className="flex items-center justify-center gap-2">
//               {isLoading ? (
//                 <>
//                   <Scan className="w-5 h-5 animate-pulse" />
//                   ANALYZING...
//                 </>
//               ) : (
//                 <>
//                   <Activity className="w-5 h-5" />
//                   DIAGNOSE
//                 </>
//               )}
//             </span>
//           </button>

//           {/* Results Display */}
//           {predictions && (
//             <div className="mt-8 space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
//               {Object.entries(predictions).map(([model, prediction], index) => 
//                 renderPredictionCard(model, prediction, index)
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DiseasePredictor;












"use client";
import { useState, useEffect } from 'react';
import { Sparkles, Activity, Brain, AlertCircle, Scan, Loader2, BarChart2, Target } from 'lucide-react';
import GeminiLoader from '../predict/GeminiLoader'
const DiseasePredictor = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState(['', '', '', '', '']);
  const [predictions, setPredictions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const symptoms = [
    'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever',
    'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload',
    'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision',
    'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose',
    'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements',
    'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness',
    'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes',
    'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 'excessive_hunger',
    'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain',
    'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness',
    'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side',
    'loss_of_smell', 'bladder_discomfort', 'foul_smell_of_urine', 'continuous_feel_of_urine',
    'passage_of_gases', 'internal_itching', 'toxic_look_typhos', 'depression', 'irritability',
    'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain',
    'abnormal_menstruation', 'dischromic_patches', 'watering_from_eyes', 'increased_appetite',
    'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration',
    'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections',
    'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption',
    'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking',
    'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting',
    'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose',
    'yellow_crust_ooze'
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialized(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 99) return 99;
          return prev + 1;
        });
      }, 3000); // 3-second delay between updates
      return () => clearInterval(interval);
    } else {
      setScanProgress(0);
    }
  }, [isLoading]);

  

  const handleSymptomChange = (index, value) => {
    const newSymptoms = [...selectedSymptoms];
    newSymptoms[index] = value;
    setSelectedSymptoms(newSymptoms);
  };

  const handlePredict = async () => {
    try {
      setIsLoading(true);
      setError('');
      setPredictions(null);
      const validSymptoms = selectedSymptoms.filter(s => s !== '');
      
      if (validSymptoms.length === 0) {
        setError('Please select at least one symptom');
        setIsLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: validSymptoms }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setPredictions(data.predictions);
    } catch (error) {
      setError('Failed to get predictions. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setScanProgress(100);
    }
  };

  const renderPredictionCard = (modelName, prediction, index) => {
    const modelIcons = {
      decisionTree: Brain,
      randomForest: Activity,
      naiveBayes: Sparkles
    };
    
    const Icon = modelIcons[modelName] || AlertCircle;
    const isActive = activeCard === modelName;
    
    const getConfidenceColor = (confidence) => {
      if (confidence >= 70) return 'bg-gradient-to-r from-emerald-400 to-emerald-500';
      if (confidence >= 40) return 'bg-gradient-to-r from-amber-400 to-amber-500';
      return 'bg-gradient-to-r from-rose-400 to-rose-500';
    };

    return (
      <div 
        className={`transition-all duration-500 ease-out transform ${
          predictions ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div 
          className={`bg-gradient-to-br from-slate-900 to-slate-800 border-2 rounded-xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300 
            ${isActive ? 'border-cyan-400 scale-105' : 'border-cyan-500/30 hover:border-cyan-400/50'}`}
          onClick={() => setActiveCard(isActive ? null : modelName)}
        >
          <div className="flex items-center gap-3 mb-4">
            <Icon className="w-6 h-6 text-cyan-400" />
            <h3 className="text-cyan-400 text-sm uppercase tracking-wider font-medium">
              {modelName.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
          </div>
          
          <p className="text-2xl font-bold text-white mb-4">
            {prediction.disease}
          </p>
          
          <div className="space-y-4">
            <div className="transition-all duration-300">
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-cyan-400">Confidence Level</span>
                <span className="text-white font-medium">{prediction.confidence}%</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ease-out ${getConfidenceColor(prediction.confidence)}`}
                  style={{ width: `${prediction.confidence}%` }}
                />
              </div>
            </div>

            <div className="transition-all duration-300">
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-cyan-400">Model Accuracy</span>
                <span className="text-white font-medium">{prediction.accuracy}%</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000 ease-out"
                  style={{ width: `${prediction.accuracy}%` }}
                />
              </div>
            </div>

            <div className="transition-all duration-300">
              <div className="flex justify-between items-center text-sm mb-1">
                <div className="flex items-center gap-1">
                  <BarChart2 className="w-4 h-4" />
                  <span className="text-cyan-400">F1 Score</span>
                </div>
                <span className="text-white font-medium">{prediction.f1_score}%</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-1000 ease-out"
                  style={{ width: `${prediction.f1_score}%` }}
                />
              </div>
            </div>

            <div className="transition-all duration-300">
              <div className="flex justify-between items-center text-sm mb-1">
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  <span className="text-cyan-400">ROC AUC</span>
                </div>
                <span className="text-white font-medium">{prediction.roc_auc}%</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-1000 ease-out"
                  style={{ width: `${prediction.roc_auc}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-cyan-400 p-6 pt-24">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-300">
            STELLAR DIAGNOSTICS
          </h1>
          <p className="text-gray-400 text-
          g font-medium tracking-wider">
            QUANTUM-POWERED MEDICAL ANALYSIS • VERSION 4.0
          </p>
        </div>

        {/* Main Interface */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 shadow-2xl">
          {/* Symptoms Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {selectedSymptoms.map((symptom, index) => (
              <div key={index} className="relative">
                <label className="block text-cyan-400 text-sm mb-2 uppercase tracking-wider font-medium">
                  Symptom {index + 1}
                </label>
                <div className="relative">
                  <select
                    value={symptom}
                    onChange={(e) => handleSymptomChange(index, e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-slate-800/50 border-2 border-cyan-500/30 rounded-lg p-4 text-white focus:border-cyan-400 transition-all duration-300 outline-none appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Symptom</option>
                    {symptoms
                      .filter(s => !selectedSymptoms.includes(s) || s === symptom)
                      .map(s => (
                        <option key={s} value={s} className="bg-slate-800">
                          {s.replace(/_/g, ' ').toUpperCase()}
                        </option>
                      ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none">
                    ▼
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
    {/* Gemini Loader */}
    {isLoading && (
            <div className="mb-6">
              <GeminiLoader
                isLoading={isLoading}
                title="Analyzing Symptoms"
                description="Our quantum-powered AI is processing your symptoms..."
              />
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-6 bg-red-900/20 border-2 border-red-500/30 rounded-lg p-4 text-red-400">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            </div>
          )}

          {/* Predict Button */}
          <button
            onClick={handlePredict}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 
                     text-white p-4 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 
                     disabled:cursor-not-allowed relative overflow-hidden"
          >
            <span className="flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <Scan className="w-5 h-5 animate-pulse" />
                  ANALYZING...
                </>
              ) : (
                <>
                  <Activity className="w-5 h-5" />
                  DIAGNOSE
                </>
              )}
            </span>
          </button>

          {/* Results Display */}
          {predictions && (
            <div className="mt-8 space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
              {Object.entries(predictions).map(([model, prediction], index) => 
                renderPredictionCard(model, prediction, index)
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseasePredictor;