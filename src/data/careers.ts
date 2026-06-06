export interface Course {
  name: string;
  platform: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
}

export interface Project {
  name: string;
  difficulty: string;
  desc: string;
  tech: string[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'Technical' | 'Behavioral' | 'System Design';
  keywords: string[];
  idealAnswer: string;
}

export interface Career {
  id: string;
  name: string;
  title: string;
  matchScore: number;
  salaryRange: string;
  demandGrowth: string;
  cagr: string;
  description: string;
  requiredSkills: string[];
  missingSkillsMock: string[];
  roadmap: string[];
  courses: Course[];
  certifications: string[];
  projects: Project[];
  questions: InterviewQuestion[];
}

export const CAREER_DATA: Record<string, Career> = {
  "ai-engineer": {
    id: "ai-engineer",
    name: "AI Engineer",
    title: "Artificial Intelligence Engineer",
    matchScore: 94,
    salaryRange: "₹8–18 LPA",
    demandGrowth: "Exponential (High)",
    cagr: "+35% YoY",
    description: "Builds, deploys, and optimizes large-scale artificial intelligence models, specifically integrating LLMs, generative AI systems, and cognitive computing agents into software products.",
    requiredSkills: ["Python", "Machine Learning", "Deep Learning", "Transformers & LLMs", "LangChain / LlamaIndex", "Vector Databases", "MLOps", "Docker", "PyTorch"],
    missingSkillsMock: ["Transformers & LLMs", "LangChain / LlamaIndex", "Vector Databases", "MLOps"],
    roadmap: [
      "Python Basics & OOP",
      "Mathematics (Linear Algebra, Calculus, Stats)",
      "Machine Learning Fundamentals",
      "Deep Learning & PyTorch/TensorFlow",
      "Natural Language Processing & Transformers",
      "LLMs, Prompt Engineering, & Vector Search",
      "MLOps, API Deployment & Docker",
      "AI System Architecture & Optimization"
    ],
    courses: [
      { name: "Deep Learning Specialization", platform: "DeepLearning.AI (Coursera)", difficulty: "Intermediate", duration: "3 Months" },
      { name: "Generative AI with Large Language Models", platform: "AWS & DeepLearning.AI", difficulty: "Intermediate", duration: "1 Month" },
      { name: "LangChain for AI Application Development", platform: "DeepLearning.AI", difficulty: "Beginner", duration: "1 Week" },
      { name: "Vector Databases & Search", platform: "Pinecone Academy", difficulty: "Intermediate", duration: "2 Weeks" }
    ],
    certifications: [
      "AWS Certified Machine Learning - Specialty",
      "TensorFlow Developer Certificate",
      "NVIDIA Deep Learning Institute Certificate"
    ],
    projects: [
      { name: "Semantic Code Search Engine", difficulty: "Advanced", desc: "Build a code repository semantic search using embeddings, Qdrant vector database, and FastAPI.", tech: ["Python", "FastAPI", "Transformers", "Qdrant"] },
      { name: "Multi-Agent Support Chatbot", difficulty: "Intermediate", desc: "Design a customer support agent framework using LangGraph and GPT-4o that handles dynamic routing, ticket creation, and auto-resolution.", tech: ["LangChain", "LangGraph", "Python", "OpenAI"] }
    ],
    questions: [
      {
        id: "ai-q1",
        question: "What is Overfitting, and how do you prevent it in Deep Learning models?",
        category: "Technical",
        keywords: ["overfitting", "validation", "dropout", "regularization", "early stopping", "data augmentation"],
        idealAnswer: "Overfitting occurs when a model learns the training data too well, including its noise and outliers, leading to poor generalization on unseen test data. In deep learning, you prevent it using: 1. Dropout layers (randomly deactivating neurons during training), 2. L1/L2 Regularization (penalizing large weights), 3. Early Stopping (stopping training when validation loss starts increasing), 4. Data Augmentation (artificially expanding the dataset), and 5. Reducing model complexity."
      },
      {
        id: "ai-q2",
        question: "Explain the difference between Retrieval-Augmented Generation (RAG) and Fine-Tuning.",
        category: "System Design",
        keywords: ["rag", "fine-tuning", "retrieval", "vector database", "parametric", "non-parametric", "knowledge base"],
        idealAnswer: "RAG combines LLMs with external knowledge retrieval. It queries a vector database for relevant documents based on the prompt and passes them to the context window of the LLM, making it excellent for dynamic, external information, reducing hallucinations, and offering cheap updates. Fine-tuning adjusts the actual weights (parametric memory) of the model on a specific dataset to learn style, format, domain jargon, or specific tasks. RAG is better for introducing new facts/information, while Fine-Tuning is better for customizing behavior or tone."
      }
    ]
  },
  "ml-engineer": {
    id: "ml-engineer",
    name: "ML Engineer",
    title: "Machine Learning Engineer",
    matchScore: 89,
    salaryRange: "₹7–15 LPA",
    demandGrowth: "Very High",
    cagr: "+28% YoY",
    description: "Bridges the gap between data science and software engineering by building production-ready pipelines, managing model lifecycles, and deploying ML models to cloud environments.",
    requiredSkills: ["Python", "SQL", "Scikit-Learn", "pandas & numpy", "Docker", "MLOps", "Kubernetes", "AWS / GCP", "CI/CD", "MLflow / WandB"],
    missingSkillsMock: ["Docker", "MLOps", "MLflow / WandB", "CI/CD"],
    roadmap: [
      "Software Engineering & Clean Code (Python/C++)",
      "Data Analysis & Feature Engineering",
      "Machine Learning Algorithms (Scikit-Learn)",
      "Model Evaluation & Hyperparameter Tuning",
      "Containerization (Docker)",
      "Model Serving (FastAPI/Triton) & Tracking (MLflow)",
      "Orchestration (Airflow/Prefect) & CI/CD",
      "Kubernetes & Scale Deployment"
    ],
    courses: [
      { name: "Machine Learning Engineering for Production (MLOps)", platform: "DeepLearning.AI (Coursera)", difficulty: "Advanced", duration: "4 Months" },
      { name: "Machine Learning Zoomcamp", platform: "DataTalksClub", difficulty: "Intermediate", duration: "3 Months" },
      { name: "Docker and Kubernetes: The Complete Guide", platform: "Udemy", difficulty: "Intermediate", duration: "2 Months" }
    ],
    certifications: [
      "Google Cloud Professional Machine Learning Engineer",
      "AWS Certified Machine Learning - Specialty",
      "Databricks Certified Machine Learning Associate"
    ],
    projects: [
      { name: "Real-time Fraud Detection System", difficulty: "Advanced", desc: "Build a low-latency fraud detection API using Kafka for event streaming, Redis for caching features, and Scikit-Learn for inference.", tech: ["Python", "Kafka", "Redis", "Scikit-Learn"] },
      { name: "Automated ML Pipeline (CI/CD)", difficulty: "Intermediate", desc: "Set up a GitHub Actions pipeline that automatically trains a sentiment model, tests accuracy against a baseline, and deploys it as a Docker image to AWS ECR.", tech: ["Docker", "GitHub Actions", "AWS", "MLflow"] }
    ],
    questions: [
      {
        id: "ml-q1",
        question: "Explain the difference between L1 (Lasso) and L2 (Ridge) regularization.",
        category: "Technical",
        keywords: ["lasso", "ridge", "sparsity", "absolute", "squared", "penalty", "coefficients"],
        idealAnswer: "L1 regularization (Lasso) adds a penalty equal to the absolute value of the magnitude of coefficients. This can shrink some coefficients to exactly zero, performing feature selection and creating sparse models. L2 regularization (Ridge) adds a penalty equal to the square of the magnitude of coefficients. It forces coefficients to be small but never exactly zero, keeping all features and distributing the weights smoothly."
      },
      {
        id: "ml-q2",
        question: "What is data leakage, and how do you prevent it during model training?",
        category: "Technical",
        keywords: ["leakage", "target leakage", "train test split", "scaling", "imputation", "cross validation"],
        idealAnswer: "Data leakage happens when information from outside the training dataset (specifically from the validation/test set or future data) is used to train the model, leading to overly optimistic training performance but poor production performance. It can be prevented by: 1. Splitting data into train/test before any preprocessing (scaling, imputation, vectorization), 2. Using pipelines (e.g., Scikit-Learn Pipeline) to ensure scaling parameters are fit only on the training folds, and 3. Excluding columns that contain future data that won't be available at the time of prediction."
      }
    ]
  },
  "data-scientist": {
    id: "data-scientist",
    name: "Data Scientist",
    title: "Data Scientist",
    matchScore: 91,
    salaryRange: "₹6–14 LPA",
    demandGrowth: "High",
    cagr: "+22% YoY",
    description: "Analyzes complex datasets to extract actionable insights, conducts statistical modeling, designs A/B tests, and builds predictive models to solve business problems.",
    requiredSkills: ["Python / R", "SQL", "Statistics", "A/B Testing", "Data Visualization", "pandas & numpy", "Tableau / PowerBI", "Communication"],
    missingSkillsMock: ["A/B Testing", "Statistical Modeling", "Tableau / PowerBI"],
    roadmap: [
      "Python / R Programming",
      "SQL Querying & Database Design",
      "Descriptive & Inferential Statistics",
      "Exploratory Data Analysis (EDA) & Visualization",
      "Statistical Hypothesis Testing & A/B Testing",
      "Supervised & Unsupervised ML Algorithms",
      "Business Intelligence Tools & Storytelling",
      "Executive Dashboard Reporting & Strategy"
    ],
    courses: [
      { name: "Google Data Analytics Professional Certificate", platform: "Google (Coursera)", difficulty: "Beginner", duration: "6 Months" },
      { name: "Applied Data Science with Python Specialization", platform: "University of Michigan", difficulty: "Intermediate", duration: "4 Months" },
      { name: "Statistical Learning", platform: "Stanford Online", difficulty: "Advanced", duration: "3 Months" }
    ],
    certifications: [
      "Tableau Desktop Certified Associate",
      "Microsoft Certified: Power BI Data Analyst Associate",
      "IBM Data Science Professional Certificate"
    ],
    projects: [
      { name: "E-Commerce Customer Segmentation", difficulty: "Intermediate", desc: "Apply K-Means clustering and RFM analysis on transactional data to identify distinct customer personas for targeted marketing campaigns.", tech: ["Python", "K-Means", "RFM", "seaborn"] },
      { name: "A/B Test Analysis Dashboard", difficulty: "Beginner", desc: "Build an interactive web application that computes statistical power, p-values, confidence intervals, and draws conclusions for user landing page A/B tests.", tech: ["Python", "Streamlit", "scipy.stats", "plotly"] }
    ],
    questions: [
      {
        id: "ds-q1",
        question: "Explain what a p-value is and how it is used in hypothesis testing.",
        category: "Technical",
        keywords: ["p-value", "null hypothesis", "significance level", "alpha", "probability", "extreme"],
        idealAnswer: "A p-value is the probability of obtaining test results at least as extreme as the observed results, assuming that the null hypothesis (the assumption of no effect or no difference) is true. If the p-value is lower than our predefined significance level (alpha, typically 0.05), we reject the null hypothesis, concluding that the observed effect is statistically significant and unlikely to have occurred by random chance."
      },
      {
        id: "ds-q2",
        question: "What is the Central Limit Theorem, and why is it important in Data Science?",
        category: "Technical",
        keywords: ["central limit theorem", "normal distribution", "sample size", "mean", "sampling distribution"],
        idealAnswer: "The Central Limit Theorem (CLT) states that, given a sufficiently large sample size (typically n >= 30), the sampling distribution of the sample mean will be approximately normally distributed, regardless of the shape of the underlying population distribution. This is crucial because it allows us to make statistical inferences, construct confidence intervals, and perform hypothesis tests (like t-tests) even when we do not know the distribution of the original population data."
      }
    ]
  },
  "data-analyst": {
    id: "data-analyst",
    name: "Data Analyst",
    title: "Data Analyst",
    matchScore: 82,
    salaryRange: "₹4–9 LPA",
    demandGrowth: "Steady / High",
    cagr: "+18% YoY",
    description: "Cleanses, structures, and analyzes data to create reports, interactive dashboards, and business insights, helping stakeholders make data-driven decisions.",
    requiredSkills: ["SQL", "Excel", "Python", "Tableau / PowerBI", "Data Cleaning", "Data Visualization", "Business Analytics", "Report Generation"],
    missingSkillsMock: ["Tableau / PowerBI", "SQL Advanced Joins & Subqueries"],
    roadmap: [
      "Advanced Microsoft Excel (VLOOKUP, Pivot Tables, PowerQuery)",
      "SQL Foundations (Select, Joins, Group By)",
      "Data Visualization Tools (Tableau or Power BI)",
      "SQL Advanced (Window Functions, Subqueries, CTEs)",
      "Python for Data Analysis (pandas, matplotlib, seaborn)",
      "Data Cleaning & Feature Formatting",
      "Business Domain Knowledge & Metrics",
      "Presentation and Reporting Skills"
    ],
    courses: [
      { name: "SQL for Data Analysis", platform: "Udacity", difficulty: "Beginner", duration: "1 Month" },
      { name: "Data Visualization with Tableau Specialization", platform: "UC Davis", difficulty: "Beginner", duration: "3 Months" },
      { name: "Data Analysis with Python", platform: "IBM (Coursera)", difficulty: "Intermediate", duration: "1 Month" }
    ],
    certifications: [
      "Google Data Analytics Certificate",
      "Microsoft Certified: Azure Data Analyst Associate",
      "CAP (Certified Analytics Professional)"
    ],
    projects: [
      { name: "Sales Performance Dashboard", difficulty: "Beginner", desc: "Design a comprehensive PowerBI or Tableau dashboard that visualizes global sales metrics, region-wise performance, and product profit margins.", tech: ["PowerBI", "SQL", "Excel"] },
      { name: "Web Scraping & Competitor Price Tracker", difficulty: "Intermediate", desc: "Build a Python script that scrapes prices from competitor websites, cleans the data, and outputs an Excel analysis report highlighting pricing trends.", tech: ["Python", "BeautifulSoup", "pandas", "Openpyxl"] }
    ],
    questions: [
      {
        id: "da-q1",
        question: "What is the difference between a INNER JOIN, LEFT JOIN, and RIGHT JOIN in SQL?",
        category: "Technical",
        keywords: ["inner join", "left join", "right join", "nulls", "matching rows", "all records"],
        idealAnswer: "INNER JOIN returns only the rows that have matching values in both tables. LEFT JOIN (or LEFT OUTER JOIN) returns all records from the left table, and the matched records from the right table; if there is no match, it returns NULL values for the right table columns. RIGHT JOIN does the opposite, returning all records from the right table and matching records from the left table, with NULLs for unmatched rows from the left table."
      },
      {
        id: "da-q2",
        question: "How do you handle missing or null values in a dataset during data cleaning?",
        category: "Technical",
        keywords: ["missing values", "nulls", "imputation", "drop", "mean", "median", "mode", "flagging"],
        idealAnswer: "Handling missing values depends on the context and the proportion of missing data. Common strategies include: 1. Deleting rows or columns (if the missing data is minimal, e.g., < 2%, and random), 2. Imputation with summary statistics (filling missing values with the mean, median, or mode of the column), 3. Predictive Imputation (using KNN or regression to predict missing values), and 4. Creating a missing category (e.g. 'Unknown') or a boolean indicator column to flag that the value was missing."
      }
    ]
  },
  "mlops-engineer": {
    id: "mlops-engineer",
    name: "MLOps Engineer",
    title: "Machine Learning Operations Engineer",
    matchScore: 85,
    salaryRange: "₹9–19 LPA",
    demandGrowth: "Critical / High",
    cagr: "+42% YoY",
    description: "Specializes in the deployment, scaling, monitoring, and automation of machine learning models in production, establishing robust CI/CD and CT (Continuous Training) pipelines.",
    requiredSkills: ["Python", "Docker", "Kubernetes", "Linux & Bash", "MLflow / WandB", "Airflow / Kubeflow", "CI/CD (GitHub Actions / GitLab)", "Terraform", "Prometheus & Grafana"],
    missingSkillsMock: ["Kubeflow / Airflow", "Terraform", "Prometheus & Grafana", "Model Monitoring"],
    roadmap: [
      "Advanced Python & Linux Administration",
      "Docker Containerization & Image Registry Management",
      "Kubernetes Orchestration & Resource Allocation",
      "CI/CD Pipelines & Infrastructure as Code (Terraform)",
      "Model Registry & Experiment Tracking (MLflow)",
      "Workflow Orchestration (Airflow, Prefect, Kubeflow)",
      "Monitoring (Prometheus, Grafana, Evidently AI) & Logging",
      "Automated Retraining (CT) & Drift Detection"
    ],
    courses: [
      { name: "MLOps Specialization", platform: "Duke University (Coursera)", difficulty: "Advanced", duration: "4 Months" },
      { name: "Made With ML MLOps Course", platform: "Goku Mohandas", difficulty: "Intermediate", duration: "2 Months" },
      { name: "Kubernetes for Developers", platform: "Linux Foundation", difficulty: "Advanced", duration: "2 Months" }
    ],
    certifications: [
      "Certified Kubernetes Administrator (CKA)",
      "HashiCorp Certified: Terraform Associate",
      "AWS Certified DevOps Engineer - Professional"
    ],
    projects: [
      { name: "End-to-End MLOps Pipeline with Kubeflow", difficulty: "Advanced", desc: "Deploy a Kubeflow pipeline on a local Kubernetes cluster (Minikube) that tracks model versions, evaluates performance on new data, and pushes models to production if they pass checks.", tech: ["Kubernetes", "Kubeflow", "Minikube", "Python"] },
      { name: "Evidently Model Drift Monitoring Dashboard", difficulty: "Advanced", desc: "Construct a monitoring stack using Prometheus, Grafana, and Evidently AI to track feature drift and prediction quality of a deployed credit scoring model.", tech: ["Prometheus", "Grafana", "Evidently AI", "Docker", "FastAPI"] }
    ],
    questions: [
      {
        id: "ops-q1",
        question: "What is model drift, and how do you monitor and resolve it?",
        category: "System Design",
        keywords: ["model drift", "concept drift", "data drift", "monitoring", "evidently", "retraining", "baselines"],
        idealAnswer: "Model drift is the decay in model prediction accuracy over time as the real-world data changes compared to the data the model was trained on. It consists of: 1. Data Drift (changes in feature distributions, e.g. user income rises due to inflation) and 2. Concept Drift (changes in the relationship between input features and target predictions, e.g., consumer behavior changes post-pandemic). It is monitored by measuring statistical distances (like KS-test, PSI) between production data and the training baseline. It is resolved by triggering an automated retraining pipeline with fresh labeled data."
      },
      {
        id: "ops-q2",
        question: "How does Kubernetes benefit ML model deployment compared to raw virtual machines?",
        category: "System Design",
        keywords: ["kubernetes", "scaling", "autoscaling", "gpu", "containers", "self-healing", "rolling updates"],
        idealAnswer: "Kubernetes offers key advantages for ML deployment: 1. Dynamic Scaling (automatically scales model pods up/down based on CPU/GPU request volume), 2. Resource Management (efficiently schedules GPU resources and allocates limits per model container), 3. Self-healing (automatically restarts crashed model pods), 4. Rolling Updates (deploys new versions without downtime, supporting A/B testing and Canary deployments), and 5. Declarative Configuration (keeps the infrastructure setup as code, matching software principles)."
      }
    ]
  }
};
