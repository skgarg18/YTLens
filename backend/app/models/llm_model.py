from langchain_groq import ChatGroq


class LLMModel:
    
    _instance = None
    
    @classmethod
    def get_llm(cls):
        if cls._instance is None:
            cls._instance = ChatGroq(
            model="openai/gpt-oss-120b",
        )   
        return cls._instance
