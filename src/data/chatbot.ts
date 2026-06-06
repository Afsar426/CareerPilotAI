export interface ChatbotResponse {
  keywords: string[];
  reply: string;
  suggestedPrompts?: string[];
}

export const CHATBOT_RESPONSES: ChatbotResponse[] = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    reply: "Hello! I am your AI Career Mentor. I can help you discover career paths in artificial intelligence, analyze your skill gaps, suggest learning roadmaps, recommend courses, or review your resume. What career path are you aiming for today?",
    suggestedPrompts: ["How do I become an AI Engineer?", "What are the trending skills in MLOps?", "Can you check my resume?"]
  },
  {
    keywords: ["become an ai engineer", "ai engineer roadmap", "become ai engineer"],
    reply: "To become an **AI Engineer**, follow this path:\n\n1. **Foundations**: Learn Python, data structures, and OOP.\n2. **Mathematics**: Linear Algebra, Calculus, and Probability.\n3. **Machine Learning**: Scikit-Learn, regression, classification, clustering.\n4. **Deep Learning**: PyTorch or TensorFlow, Neural Networks, CNNs, RNNs.\n5. **Generative AI & LLMs**: Transformers, Prompt Engineering, Vector Databases (Pinecone/Chroma), LangChain/LlamaIndex.\n6. **MLOps**: Docker, API serving (FastAPI), cloud deployment.\n\n*Estimated Time*: **8-12 Months** of dedicated study.",
    suggestedPrompts: ["Recommend AI courses", "What projects should an AI Engineer build?", "AI Engineer salary"]
  },
  {
    keywords: ["mlops", "machine learning operations", "trending skills in mlops"],
    reply: "**MLOps** is one of the fastest-growing fields. Critical skills include:\n\n* **Containerization**: Docker\n* **Orchestration**: Kubernetes, K3s, Minikube\n* **Workflow Automation**: Apache Airflow, Prefect, Kubeflow\n* **Experiment & Model Registry**: MLflow, Weights & Biases\n* **CI/CD**: GitHub Actions, GitLab CI\n* **Monitoring**: Prometheus, Grafana, Evidently AI\n* **Infrastructure as Code**: Terraform\n\nMLOps ensures models aren't just trained, but reliably deployed, scaled, and monitored in production.",
    suggestedPrompts: ["What is model drift?", "Suggest an MLOps project", "MLOps Engineer roadmap"]
  },
  {
    keywords: ["salary", "lpa", "earn", "pay", "money"],
    reply: "Here are the average salary ranges in India for modern AI/ML roles:\n\n* **AI Engineer**: ₹8 – 18 LPA (Junior/Mid) | ₹20 – 45+ LPA (Senior)\n* **ML Engineer**: ₹7 – 15 LPA (Junior/Mid) | ₹18 – 35+ LPA (Senior)\n* **Data Scientist**: ₹6 – 14 LPA (Junior/Mid) | ₹16 – 30+ LPA (Senior)\n* **MLOps Engineer**: ₹9 – 19 LPA (Junior/Mid) | ₹22 – 40+ LPA (Senior)\n* **Data Analyst**: ₹4 – 9 LPA (Junior/Mid) | ₹10 – 18+ LPA (Senior)",
    suggestedPrompts: ["Which role is in highest demand?", "How to get a high salary?"]
  },
  {
    keywords: ["resume", "cv", "upload", "parse", "analyzer"],
    reply: "You can upload your resume in the **Resume Intelligence** section or in your dashboard! Once uploaded, my parser will extract your skills, highlight your strengths, detect missing skills for your target career, and give you an actionable optimization score.",
    suggestedPrompts: ["Upload my resume", "What makes a good AI resume?"]
  },
  {
    keywords: ["project", "portfolio", "projects to build"],
    reply: "To stand out to recruiters, build end-to-end projects. Here are recommendations:\n\n* **AI Engineer**: A multi-agent system using LangGraph and a vector database for semantic search and document reasoning.\n* **ML Engineer**: A real-time API (FastAPI) that predicts house prices or fraud, with a CI/CD pipeline that builds a Docker image and deploys it to AWS.\n* **Data Scientist**: A customer segmentation model using K-Means, deployed with a Streamlit dashboard showing interactive business recommendations.",
    suggestedPrompts: ["How to deploy an ML model?", "AI Engineer projects"]
  },
  {
    keywords: ["course", "learn", "study", "certifications", "certificate"],
    reply: "Top-recommended learning tracks:\n\n1. **Deep Learning Specialization** (DeepLearning.AI on Coursera) - Gold standard for neural networks.\n2. **Google Data Analytics Professional Certificate** (Coursera) - Great for data analyst foundations.\n3. **Generative AI with LLMs** (AWS & DeepLearning.AI) - Excellent for LLM training and RAG.\n4. **Certified Kubernetes Administrator (CKA)** - Highly valued for MLOps roles.",
    suggestedPrompts: ["Show me my custom roadmap", "AI Engineer certifications"]
  },
  {
    keywords: ["drift", "model drift", "overfitting"],
    reply: "Great technical query!\n\n* **Overfitting**: When a model memorizes training data (including noise) and fails to generalize. Fix it with Dropout, Regularization, and Early Stopping.\n* **Model Drift**: The decline in model accuracy in production due to changes in real-world data (Data Drift) or relationships (Concept Drift). Solve it by setting up a monitoring stack (Prometheus/Evidently) and automating retraining.",
    suggestedPrompts: ["What is overfitting?", "How to handle missing data?"]
  }
];

export const getChatbotResponse = (message: string): { reply: string; prompts: string[] } => {
  const normalized = message.toLowerCase();
  
  // Find matching response
  for (const item of CHATBOT_RESPONSES) {
    for (const keyword of item.keywords) {
      if (normalized.includes(keyword)) {
        return {
          reply: item.reply,
          prompts: item.suggestedPrompts || ["How do I become an AI Engineer?", "Trending MLOps skills", "Compare salaries"]
        };
      }
    }
  }
  
  // Default response
  return {
    reply: "I'm not sure I fully understand that career query, but I'd love to help! Try asking about becoming an AI Engineer, learning MLOps, salary ranges, resume parser, or project ideas.",
    prompts: ["How do I become an AI Engineer?", "What are the trending skills in MLOps?", "What are the average salaries?"]
  };
};
