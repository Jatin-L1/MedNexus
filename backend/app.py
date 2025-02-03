# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import numpy as np
# import pandas as pd
# from sklearn import tree
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.naive_bayes import GaussianNB

# app = Flask(__name__)
# CORS(app)

# # Lists of symptoms and diseases - exactly as in original code
# l1=['back_pain','constipation','abdominal_pain','diarrhoea','mild_fever','yellow_urine',
# 'yellowing_of_eyes','acute_liver_failure','fluid_overload','swelling_of_stomach',
# 'swelled_lymph_nodes','malaise','blurred_and_distorted_vision','phlegm','throat_irritation',
# 'redness_of_eyes','sinus_pressure','runny_nose','congestion','chest_pain','weakness_in_limbs',
# 'fast_heart_rate','pain_during_bowel_movements','pain_in_anal_region','bloody_stool',
# 'irritation_in_anus','neck_pain','dizziness','cramps','bruising','obesity','swollen_legs',
# 'swollen_blood_vessels','puffy_face_and_eyes','enlarged_thyroid','brittle_nails',
# 'swollen_extremeties','excessive_hunger','extra_marital_contacts','drying_and_tingling_lips',
# 'slurred_speech','knee_pain','hip_joint_pain','muscle_weakness','stiff_neck','swelling_joints',
# 'movement_stiffness','spinning_movements','loss_of_balance','unsteadiness',
# 'weakness_of_one_body_side','loss_of_smell','bladder_discomfort','foul_smell_of urine',
# 'continuous_feel_of_urine','passage_of_gases','internal_itching','toxic_look_(typhos)',
# 'depression','irritability','muscle_pain','altered_sensorium','red_spots_over_body','belly_pain',
# 'abnormal_menstruation','dischromic _patches','watering_from_eyes','increased_appetite','polyuria',
# 'family_history','mucoid_sputum','rusty_sputum','lack_of_concentration','visual_disturbances',
# 'receiving_blood_transfusion','receiving_unsterile_injections','coma','stomach_bleeding',
# 'distention_of_abdomen','history_of_alcohol_consumption','fluid_overload','blood_in_sputum',
# 'prominent_veins_on_calf','palpitations','painful_walking','pus_filled_pimples','blackheads',
# 'scurring','skin_peeling','silver_like_dusting','small_dents_in_nails','inflammatory_nails',
# 'blister','red_sore_around_nose','yellow_crust_ooze']

# disease=['Fungal infection','Allergy','GERD','Chronic cholestasis','Drug Reaction',
# 'Peptic ulcer diseae','AIDS','Diabetes','Gastroenteritis','Bronchial Asthma','Hypertension',
# ' Migraine','Cervical spondylosis','Paralysis (brain hemorrhage)','Jaundice','Malaria',
# 'Chicken pox','Dengue','Typhoid','hepatitis A','Hepatitis B','Hepatitis C','Hepatitis D',
# 'Hepatitis E','Alcoholic hepatitis','Tuberculosis','Common Cold','Pneumonia',
# 'Dimorphic hemmorhoids(piles)','Heartattack','Varicoseveins','Hypothyroidism',
# 'Hyperthyroidism','Hypoglycemia','Osteoarthristis','Arthritis',
# '(vertigo) Paroymsal  Positional Vertigo','Acne','Urinary tract infection','Psoriasis','Impetigo']

# # Global variables for models and data
# l2 = [0] * len(l1)
# clf3 = None  # Decision Tree model
# clf4 = None  # Random Forest model
# gnb = None   # Naive Bayes model

# def init():
#     global clf3, clf4, gnb
    
#     # Load and preprocess training data - exactly as in original code
#     df = pd.read_csv("Training.csv")
    
#     # Disease to number mapping - exactly as in original code
#     df.replace({'prognosis':{
#         'Fungal infection':0,'Allergy':1,'GERD':2,'Chronic cholestasis':3,'Drug Reaction':4,
#         'Peptic ulcer diseae':5,'AIDS':6,'Diabetes ':7,'Gastroenteritis':8,'Bronchial Asthma':9,
#         'Hypertension ':10,'Migraine':11,'Cervical spondylosis':12,'Paralysis (brain hemorrhage)':13,
#         'Jaundice':14,'Malaria':15,'Chicken pox':16,'Dengue':17,'Typhoid':18,'hepatitis A':19,
#         'Hepatitis B':20,'Hepatitis C':21,'Hepatitis D':22,'Hepatitis E':23,'Alcoholic hepatitis':24,
#         'Tuberculosis':25,'Common Cold':26,'Pneumonia':27,'Dimorphic hemmorhoids(piles)':28,
#         'Heart attack':29,'Varicose veins':30,'Hypothyroidism':31,'Hyperthyroidism':32,
#         'Hypoglycemia':33,'Osteoarthristis':34,'Arthritis':35,'(vertigo) Paroymsal  Positional Vertigo':36,
#         'Acne':37,'Urinary tract infection':38,'Psoriasis':39,'Impetigo':40}}, inplace=True)
#     df = df.infer_objects(copy=False)
#     X = df[l1]
#     y = df[["prognosis"]]
#     np.ravel(y)
    
#     # Load and preprocess testing data
#     tr = pd.read_csv("Testing.csv")
#     tr.replace({'prognosis':{
#         'Fungal infection':0,'Allergy':1,'GERD':2,'Chronic cholestasis':3,'Drug Reaction':4,
#         'Peptic ulcer diseae':5,'AIDS':6,'Diabetes ':7,'Gastroenteritis':8,'Bronchial Asthma':9,
#         'Hypertension ':10,'Migraine':11,'Cervical spondylosis':12,'Paralysis (brain hemorrhage)':13,
#         'Jaundice':14,'Malaria':15,'Chicken pox':16,'Dengue':17,'Typhoid':18,'hepatitis A':19,
#         'Hepatitis B':20,'Hepatitis C':21,'Hepatitis D':22,'Hepatitis E':23,'Alcoholic hepatitis':24,
#         'Tuberculosis':25,'Common Cold':26,'Pneumonia':27,'Dimorphic hemmorhoids(piles)':28,
#         'Heart attack':29,'Varicose veins':30,'Hypothyroidism':31,'Hyperthyroidism':32,
#         'Hypoglycemia':33,'Osteoarthristis':34,'Arthritis':35,'(vertigo) Paroymsal  Positional Vertigo':36,
#         'Acne':37,'Urinary tract infection':38,'Psoriasis':39,'Impetigo':40}}, inplace=True)
#     tr = tr.infer_objects(copy=False)
#     X_test = tr[l1]
#     y_test = tr[["prognosis"]]
#     np.ravel(y_test)
    
#     # Train models - exactly as in original code
#     # Decision Tree
#     clf3 = tree.DecisionTreeClassifier()
#     clf3 = clf3.fit(X, y.values.ravel())  # Fixed: Convert y to 1D array
    
#     # Random Forest
#     clf4 = RandomForestClassifier()
#     clf4 = clf4.fit(X, y.values.ravel())  # Fixed: Convert y to 1D array
    
#     # Naive Bayes
#     gnb = GaussianNB()
#     gnb = gnb.fit(X, y.values.ravel())  # Fixed: Convert y to 1D array
    
#     print("Models initialized successfully!")

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.get_json()
#         symptoms = data.get('symptoms', [])
        
#         if not symptoms:
#             return jsonify({'error': 'No symptoms provided'}), 400
        
#         # Reset l2 for new prediction
#         l2 = [0] * len(l1)
        
#         # Convert symptoms to binary vector - exactly as in original code
#         for k in range(0, len(l1)):
#             for z in symptoms:
#                 if z == l1[k]:
#                     l2[k] = 1
        
#         inputtest = [l2]
        
#         # Get predictions
#         dt_prediction = clf3.predict(inputtest)[0]
#         rf_prediction = clf4.predict(inputtest)[0]
#         nb_prediction = gnb.predict(inputtest)[0]
        
#         # Format response - similar to original code's output format
#         response = {
#             'predictions': {
#                 'decisionTree': disease[dt_prediction] if dt_prediction < len(disease) else "Not Found",
#                 'randomForest': disease[rf_prediction] if rf_prediction < len(disease) else "Not Found",
#                 'naiveBayes': disease[nb_prediction] if nb_prediction < len(disease) else "Not Found"
#             }
#         }
        
#         return jsonify(response)
        
#     except Exception as e:
#         print(f"Error in prediction: {str(e)}")
#         return jsonify({'error': str(e)}), 500

# @app.route('/symptoms', methods=['GET'])
# def get_symptoms():
#     return jsonify({'symptoms': sorted(l1)})

# if __name__ == '__main__':
#     print("Initializing models...")
#     init()
#     app.run(debug=True)



# ## below code is working fine confidence and accuracy is added




# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import numpy as np
# import pandas as pd
# from sklearn import tree
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.naive_bayes import GaussianNB

# app = Flask(__name__)
# CORS(app)

# # Lists of symptoms and diseases - exactly as in original code
# l1=['back_pain','constipation','abdominal_pain','diarrhoea','mild_fever','yellow_urine',
# 'yellowing_of_eyes','acute_liver_failure','fluid_overload','swelling_of_stomach',
# 'swelled_lymph_nodes','malaise','blurred_and_distorted_vision','phlegm','throat_irritation',
# 'redness_of_eyes','sinus_pressure','runny_nose','congestion','chest_pain','weakness_in_limbs',
# 'fast_heart_rate','pain_during_bowel_movements','pain_in_anal_region','bloody_stool',
# 'irritation_in_anus','neck_pain','dizziness','cramps','bruising','obesity','swollen_legs',
# 'swollen_blood_vessels','puffy_face_and_eyes','enlarged_thyroid','brittle_nails',
# 'swollen_extremeties','excessive_hunger','extra_marital_contacts','drying_and_tingling_lips',
# 'slurred_speech','knee_pain','hip_joint_pain','muscle_weakness','stiff_neck','swelling_joints',
# 'movement_stiffness','spinning_movements','loss_of_balance','unsteadiness',
# 'weakness_of_one_body_side','loss_of_smell','bladder_discomfort','foul_smell_of urine',
# 'continuous_feel_of_urine','passage_of_gases','internal_itching','toxic_look_(typhos)',
# 'depression','irritability','muscle_pain','altered_sensorium','red_spots_over_body','belly_pain',
# 'abnormal_menstruation','dischromic _patches','watering_from_eyes','increased_appetite','polyuria',
# 'family_history','mucoid_sputum','rusty_sputum','lack_of_concentration','visual_disturbances',
# 'receiving_blood_transfusion','receiving_unsterile_injections','coma','stomach_bleeding',
# 'distention_of_abdomen','history_of_alcohol_consumption','fluid_overload','blood_in_sputum',
# 'prominent_veins_on_calf','palpitations','painful_walking','pus_filled_pimples','blackheads',
# 'scurring','skin_peeling','silver_like_dusting','small_dents_in_nails','inflammatory_nails',
# 'blister','red_sore_around_nose','yellow_crust_ooze']

# disease=['Fungal infection','Allergy','GERD','Chronic cholestasis','Drug Reaction',
# 'Peptic ulcer diseae','AIDS','Diabetes','Gastroenteritis','Bronchial Asthma','Hypertension',
# ' Migraine','Cervical spondylosis','Paralysis (brain hemorrhage)','Jaundice','Malaria',
# 'Chicken pox','Dengue','Typhoid','hepatitis A','Hepatitis B','Hepatitis C','Hepatitis D',
# 'Hepatitis E','Alcoholic hepatitis','Tuberculosis','Common Cold','Pneumonia',
# 'Dimorphic hemmorhoids(piles)','Heartattack','Varicoseveins','Hypothyroidism',
# 'Hyperthyroidism','Hypoglycemia','Osteoarthristis','Arthritis',
# '(vertigo) Paroymsal  Positional Vertigo','Acne','Urinary tract infection','Psoriasis','Impetigo']

# # Global variables for models and data
# l2 = [0] * len(l1)
# clf3 = None  # Decision Tree model
# clf4 = None  # Random Forest model
# gnb = None   # Naive Bayes model
# X_test = None
# y_test = None

# def init():
#     global clf3, clf4, gnb, X_test, y_test
    
#     # Load and preprocess training data
#     df = pd.read_csv("Training.csv")
    
#     # Disease to number mapping
#     df.replace({'prognosis':{
#         'Fungal infection':0,'Allergy':1,'GERD':2,'Chronic cholestasis':3,'Drug Reaction':4,
#         'Peptic ulcer diseae':5,'AIDS':6,'Diabetes ':7,'Gastroenteritis':8,'Bronchial Asthma':9,
#         'Hypertension ':10,'Migraine':11,'Cervical spondylosis':12,'Paralysis (brain hemorrhage)':13,
#         'Jaundice':14,'Malaria':15,'Chicken pox':16,'Dengue':17,'Typhoid':18,'hepatitis A':19,
#         'Hepatitis B':20,'Hepatitis C':21,'Hepatitis D':22,'Hepatitis E':23,'Alcoholic hepatitis':24,
#         'Tuberculosis':25,'Common Cold':26,'Pneumonia':27,'Dimorphic hemmorhoids(piles)':28,
#         'Heart attack':29,'Varicose veins':30,'Hypothyroidism':31,'Hyperthyroidism':32,
#         'Hypoglycemia':33,'Osteoarthristis':34,'Arthritis':35,'(vertigo) Paroymsal  Positional Vertigo':36,
#         'Acne':37,'Urinary tract infection':38,'Psoriasis':39,'Impetigo':40}}, inplace=True)
#     df = df.infer_objects(copy=False)
#     X = df[l1]
#     y = df[["prognosis"]]
    
#     # Load and preprocess testing data
#     tr = pd.read_csv("Testing.csv")
#     tr.replace({'prognosis':{
#         'Fungal infection':0,'Allergy':1,'GERD':2,'Chronic cholestasis':3,'Drug Reaction':4,
#         'Peptic ulcer diseae':5,'AIDS':6,'Diabetes ':7,'Gastroenteritis':8,'Bronchial Asthma':9,
#         'Hypertension ':10,'Migraine':11,'Cervical spondylosis':12,'Paralysis (brain hemorrhage)':13,
#         'Jaundice':14,'Malaria':15,'Chicken pox':16,'Dengue':17,'Typhoid':18,'hepatitis A':19,
#         'Hepatitis B':20,'Hepatitis C':21,'Hepatitis D':22,'Hepatitis E':23,'Alcoholic hepatitis':24,
#         'Tuberculosis':25,'Common Cold':26,'Pneumonia':27,'Dimorphic hemmorhoids(piles)':28,
#         'Heart attack':29,'Varicose veins':30,'Hypothyroidism':31,'Hyperthyroidism':32,
#         'Hypoglycemia':33,'Osteoarthristis':34,'Arthritis':35,'(vertigo) Paroymsal  Positional Vertigo':36,
#         'Acne':37,'Urinary tract infection':38,'Psoriasis':39,'Impetigo':40}}, inplace=True)
#     tr = tr.infer_objects(copy=False)
#     X_test = tr[l1]
#     y_test = tr[["prognosis"]]
    
#     # Train models
#     # Decision Tree
#     clf3 = tree.DecisionTreeClassifier()
#     clf3 = clf3.fit(X, y.values.ravel())
    
#     # Random Forest
#     clf4 = RandomForestClassifier()
#     clf4 = clf4.fit(X, y.values.ravel())
    
#     # Naive Bayes
#     gnb = GaussianNB()
#     gnb = gnb.fit(X, y.values.ravel())
    
#     print("Models initialized successfully!")

# def get_prediction_confidence(model, input_data):
#     """Get prediction probabilities for the input data"""
#     try:
#         proba = model.predict_proba(input_data)
#         return np.max(proba[0]) * 100
#     except:
#         return 0

# def get_model_accuracy(model):
#     """Calculate model accuracy on test set"""
#     try:
#         return model.score(X_test, y_test) * 100
#     except:
#         return 0

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.get_json()
#         symptoms = data.get('symptoms', [])
        
#         if not symptoms:
#             return jsonify({'error': 'No symptoms provided'}), 400
        
#         # Reset l2 for new prediction
#         l2 = [0] * len(l1)
        
#         # Convert symptoms to binary vector
#         for k in range(0, len(l1)):
#             for z in symptoms:
#                 if z == l1[k]:
#                     l2[k] = 1
        
#         inputtest = [l2]
        
#         # Get predictions
#         dt_prediction = clf3.predict(inputtest)[0]
#         rf_prediction = clf4.predict(inputtest)[0]
#         nb_prediction = gnb.predict(inputtest)[0]
        
#         # Get confidence scores
#         dt_confidence = get_prediction_confidence(clf3, inputtest)
#         rf_confidence = get_prediction_confidence(clf4, inputtest)
#         nb_confidence = get_prediction_confidence(gnb, inputtest)
        
#         # Get model accuracies
#         dt_accuracy = get_model_accuracy(clf3)
#         rf_accuracy = get_model_accuracy(clf4)
#         nb_accuracy = get_model_accuracy(gnb)
        
#         # Format response
#         response = {
#             'predictions': {
#                 'decisionTree': {
#                     'disease': disease[dt_prediction] if dt_prediction < len(disease) else "Not Found",
#                     'confidence': round(dt_confidence, 2),
#                     'accuracy': round(dt_accuracy, 2)
#                 },
#                 'randomForest': {
#                     'disease': disease[rf_prediction] if rf_prediction < len(disease) else "Not Found",
#                     'confidence': round(rf_confidence, 2),
#                     'accuracy': round(rf_accuracy, 2)
#                 },
#                 'naiveBayes': {
#                     'disease': disease[nb_prediction] if nb_prediction < len(disease) else "Not Found",
#                     'confidence': round(nb_confidence, 2),
#                     'accuracy': round(nb_accuracy, 2)
#                 }
#             }
#         }
        
#         return jsonify(response)
        
#     except Exception as e:
#         print(f"Error in prediction: {str(e)}")
#         return jsonify({'error': str(e)}), 500

# @app.route('/symptoms', methods=['GET'])
# def get_symptoms():
#     return jsonify({'symptoms': sorted(l1)})

# if __name__ == '__main__':
#     print("Initializing models...")
#     init()
#     app.run(debug=True)






from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn import tree
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import roc_auc_score, f1_score
from sklearn.preprocessing import label_binarize

app = Flask(__name__)
CORS(app)

# Lists of symptoms and diseases - exactly as in original code
l1=['back_pain','constipation','abdominal_pain','diarrhoea','mild_fever','yellow_urine',
'yellowing_of_eyes','acute_liver_failure','fluid_overload','swelling_of_stomach',
'swelled_lymph_nodes','malaise','blurred_and_distorted_vision','phlegm','throat_irritation',
'redness_of_eyes','sinus_pressure','runny_nose','congestion','chest_pain','weakness_in_limbs',
'fast_heart_rate','pain_during_bowel_movements','pain_in_anal_region','bloody_stool',
'irritation_in_anus','neck_pain','dizziness','cramps','bruising','obesity','swollen_legs',
'swollen_blood_vessels','puffy_face_and_eyes','enlarged_thyroid','brittle_nails',
'swollen_extremeties','excessive_hunger','extra_marital_contacts','drying_and_tingling_lips',
'slurred_speech','knee_pain','hip_joint_pain','muscle_weakness','stiff_neck','swelling_joints',
'movement_stiffness','spinning_movements','loss_of_balance','unsteadiness',
'weakness_of_one_body_side','loss_of_smell','bladder_discomfort','foul_smell_of urine',
'continuous_feel_of_urine','passage_of_gases','internal_itching','toxic_look_(typhos)',
'depression','irritability','muscle_pain','altered_sensorium','red_spots_over_body','belly_pain',
'abnormal_menstruation','dischromic _patches','watering_from_eyes','increased_appetite','polyuria',
'family_history','mucoid_sputum','rusty_sputum','lack_of_concentration','visual_disturbances',
'receiving_blood_transfusion','receiving_unsterile_injections','coma','stomach_bleeding',
'distention_of_abdomen','history_of_alcohol_consumption','fluid_overload','blood_in_sputum',
'prominent_veins_on_calf','palpitations','painful_walking','pus_filled_pimples','blackheads',
'scurring','skin_peeling','silver_like_dusting','small_dents_in_nails','inflammatory_nails',
'blister','red_sore_around_nose','yellow_crust_ooze']

disease=['Fungal infection','Allergy','GERD','Chronic cholestasis','Drug Reaction',
'Peptic ulcer diseae','AIDS','Diabetes','Gastroenteritis','Bronchial Asthma','Hypertension',
' Migraine','Cervical spondylosis','Paralysis (brain hemorrhage)','Jaundice','Malaria',
'Chicken pox','Dengue','Typhoid','hepatitis A','Hepatitis B','Hepatitis C','Hepatitis D',
'Hepatitis E','Alcoholic hepatitis','Tuberculosis','Common Cold','Pneumonia',
'Dimorphic hemmorhoids(piles)','Heartattack','Varicoseveins','Hypothyroidism',
'Hyperthyroidism','Hypoglycemia','Osteoarthristis','Arthritis',
'(vertigo) Paroymsal  Positional Vertigo','Acne','Urinary tract infection','Psoriasis','Impetigo']

# Global variables for models and data
l2 = [0] * len(l1)
clf3 = None  # Decision Tree model
clf4 = None  # Random Forest model
gnb = None   # Naive Bayes model
X_test = None
y_test = None

def calculate_metrics(model, X_test, y_test):
    """Calculate AUC-ROC and F1 scores for a model"""
    try:
        # Get predictions
        y_pred = model.predict(X_test)
        
        # Calculate F1 score (macro average for multi-class)
        f1 = f1_score(y_test, y_pred, average='macro')
        
        # Calculate ROC AUC (multi-class)
        y_test_bin = label_binarize(y_test, classes=range(len(disease)))
        y_pred_proba = model.predict_proba(X_test)
        
        # Calculate ROC AUC for each class and take average
        roc_auc = roc_auc_score(y_test_bin, y_pred_proba, multi_class='ovr', average='macro')
        
        return {
            'f1_score': round(f1 * 100, 2),
            'roc_auc': round(roc_auc * 100, 2)
        }
    except Exception as e:
        print(f"Error calculating metrics: {str(e)}")
        return {'f1_score': 0, 'roc_auc': 0}

def init():
    global clf3, clf4, gnb, X_test, y_test
    
    # Load and preprocess training data
    df = pd.read_csv("Training.csv")
    
    # Disease to number mapping
    df.replace({'prognosis':{
        'Fungal infection':0,'Allergy':1,'GERD':2,'Chronic cholestasis':3,'Drug Reaction':4,
        'Peptic ulcer diseae':5,'AIDS':6,'Diabetes ':7,'Gastroenteritis':8,'Bronchial Asthma':9,
        'Hypertension ':10,'Migraine':11,'Cervical spondylosis':12,'Paralysis (brain hemorrhage)':13,
        'Jaundice':14,'Malaria':15,'Chicken pox':16,'Dengue':17,'Typhoid':18,'hepatitis A':19,
        'Hepatitis B':20,'Hepatitis C':21,'Hepatitis D':22,'Hepatitis E':23,'Alcoholic hepatitis':24,
        'Tuberculosis':25,'Common Cold':26,'Pneumonia':27,'Dimorphic hemmorhoids(piles)':28,
        'Heart attack':29,'Varicose veins':30,'Hypothyroidism':31,'Hyperthyroidism':32,
        'Hypoglycemia':33,'Osteoarthristis':34,'Arthritis':35,'(vertigo) Paroymsal  Positional Vertigo':36,
        'Acne':37,'Urinary tract infection':38,'Psoriasis':39,'Impetigo':40}}, inplace=True)
    df = df.infer_objects(copy=False)
    X = df[l1]
    y = df[["prognosis"]]
    
    # Load and preprocess testing data
    tr = pd.read_csv("Testing.csv")
    tr.replace({'prognosis':{
        'Fungal infection':0,'Allergy':1,'GERD':2,'Chronic cholestasis':3,'Drug Reaction':4,
        'Peptic ulcer diseae':5,'AIDS':6,'Diabetes ':7,'Gastroenteritis':8,'Bronchial Asthma':9,
        'Hypertension ':10,'Migraine':11,'Cervical spondylosis':12,'Paralysis (brain hemorrhage)':13,
        'Jaundice':14,'Malaria':15,'Chicken pox':16,'Dengue':17,'Typhoid':18,'hepatitis A':19,
        'Hepatitis B':20,'Hepatitis C':21,'Hepatitis D':22,'Hepatitis E':23,'Alcoholic hepatitis':24,
        'Tuberculosis':25,'Common Cold':26,'Pneumonia':27,'Dimorphic hemmorhoids(piles)':28,
        'Heart attack':29,'Varicose veins':30,'Hypothyroidism':31,'Hyperthyroidism':32,
        'Hypoglycemia':33,'Osteoarthristis':34,'Arthritis':35,'(vertigo) Paroymsal  Positional Vertigo':36,
        'Acne':37,'Urinary tract infection':38,'Psoriasis':39,'Impetigo':40}}, inplace=True)
    tr = tr.infer_objects(copy=False)
    X_test = tr[l1]
    y_test = tr[["prognosis"]]
    
    # Train models
    # Decision Tree
    clf3 = tree.DecisionTreeClassifier()
    clf3 = clf3.fit(X, y.values.ravel())
    
    # Random Forest
    clf4 = RandomForestClassifier()
    clf4 = clf4.fit(X, y.values.ravel())
    
    # Naive Bayes
    gnb = GaussianNB()
    gnb = gnb.fit(X, y.values.ravel())
    
    print("Models initialized successfully!")

def get_prediction_confidence(model, input_data):
    """Get prediction probabilities for the input data"""
    try:
        proba = model.predict_proba(input_data)
        return np.max(proba[0]) * 100
    except:
        return 0

def get_model_accuracy(model):
    """Calculate model accuracy on test set"""
    try:
        return model.score(X_test, y_test) * 100
    except:
        return 0

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        symptoms = data.get('symptoms', [])
        
        if not symptoms:
            return jsonify({'error': 'No symptoms provided'}), 400
        
        # Reset l2 for new prediction
        l2 = [0] * len(l1)
        
        # Convert symptoms to binary vector
        for k in range(0, len(l1)):
            for z in symptoms:
                if z == l1[k]:
                    l2[k] = 1
        
        inputtest = [l2]
        
        # Get predictions
        dt_prediction = clf3.predict(inputtest)[0]
        rf_prediction = clf4.predict(inputtest)[0]
        nb_prediction = gnb.predict(inputtest)[0]
        
        # Get confidence scores
        dt_confidence = get_prediction_confidence(clf3, inputtest)
        rf_confidence = get_prediction_confidence(clf4, inputtest)
        nb_confidence = get_prediction_confidence(gnb, inputtest)
        
        # Get model accuracies
        dt_accuracy = get_model_accuracy(clf3)
        rf_accuracy = get_model_accuracy(clf4)
        nb_accuracy = get_model_accuracy(gnb)
        
        # Calculate additional metrics
        dt_metrics = calculate_metrics(clf3, X_test, y_test)
        rf_metrics = calculate_metrics(clf4, X_test, y_test)
        nb_metrics = calculate_metrics(gnb, X_test, y_test)
        
        # Format response
        response = {
            'predictions': {
                'decisionTree': {
                    'disease': disease[dt_prediction] if dt_prediction < len(disease) else "Not Found",
                    'confidence': round(dt_confidence, 2),
                    'accuracy': round(dt_accuracy, 2),
                    'f1_score': dt_metrics['f1_score'],
                    'roc_auc': dt_metrics['roc_auc']
                },
                'randomForest': {
                    'disease': disease[rf_prediction] if rf_prediction < len(disease) else "Not Found",
                    'confidence': round(rf_confidence, 2),
                    'accuracy': round(rf_accuracy, 2),
                    'f1_score': rf_metrics['f1_score'],
                    'roc_auc': rf_metrics['roc_auc']
                },
                'naiveBayes': {
                    'disease': disease[nb_prediction] if nb_prediction < len(disease) else "Not Found",
                    'confidence': round(nb_confidence, 2),
                    'accuracy': round(nb_accuracy, 2),
                    'f1_score': nb_metrics['f1_score'],
                    'roc_auc': nb_metrics['roc_auc']
                }
            }
        }
        
        return jsonify(response)
        
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/symptoms', methods=['GET'])
def get_symptoms():
    return jsonify({'symptoms': sorted(l1)})

if __name__ == '__main__':
    print("Initializing models...")
    init()
    app.run(debug=True)