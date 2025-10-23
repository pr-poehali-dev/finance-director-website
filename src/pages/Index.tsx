import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://functions.poehali.dev/500fe558-b65d-47b6-8a49-fb2684e11a67", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Заявка отправлена!",
          description: "Я свяжусь с вами в ближайшее время.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте позже или свяжитесь напрямую.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const competencies = [
    {
      icon: "TrendingUp",
      title: "Финансовое планирование",
      description: "Разработка долгосрочных стратегий и финансовых моделей для устойчивого роста бизнеса"
    },
    {
      icon: "PieChart",
      title: "Бюджетирование",
      description: "Эффективное управление бюджетами и оптимизация финансовых потоков компании"
    },
    {
      icon: "LineChart",
      title: "Финансовый анализ",
      description: "Глубокий анализ показателей и подготовка управленческой отчетности"
    },
    {
      icon: "ShieldCheck",
      title: "Управление рисками",
      description: "Выявление и минимизация финансовых рисков на всех уровнях организации"
    }
  ];

  const experience = [
    {
      period: "2020 — настоящее время",
      company: "Международная корпорация",
      position: "Финансовый директор (CFO)",
      achievements: ["Увеличение EBITDA на 45%", "Оптимизация затрат на 30%", "Привлечение инвестиций $50M"]
    },
    {
      period: "2015 — 2020",
      company: "Технологическая компания",
      position: "Директор по финансам",
      achievements: ["Выход на безубыточность", "Построение финансового отдела", "IPO подготовка"]
    },
    {
      period: "2010 — 2015",
      company: "Консалтинговая группа",
      position: "Старший консультант",
      achievements: ["20+ успешных проектов", "Реструктуризация компаний", "M&A сделки"]
    }
  ];

  const achievements = [
    { number: "15+", label: "Лет опыта" },
    { number: "$500M+", label: "Управляемых активов" },
    { number: "50+", label: "Реализованных проектов" },
    { number: "98%", label: "Довольных клиентов" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="font-serif text-2xl font-bold text-primary">CFO</div>
            <div className="hidden md:flex gap-8">
              {["home", "about", "competencies", "experience", "achievements", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    activeSection === section ? "text-accent" : "text-muted-foreground"
                  }`}
                >
                  {section === "home" && "Главная"}
                  {section === "about" && "Обо мне"}
                  {section === "competencies" && "Компетенции"}
                  {section === "experience" && "Опыт"}
                  {section === "achievements" && "Достижения"}
                  {section === "contact" && "Контакты"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block px-4 py-2 mb-6 bg-secondary rounded-full text-sm font-medium text-muted-foreground">
              Финансовый директор (CFO)
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-primary leading-tight">
              Стратегическое управление финансами
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Помогаю компаниям достигать финансовых целей через консалтинг и стратегическое планирование
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => scrollToSection("contact")} size="lg" className="bg-primary hover:bg-primary/90">
                Связаться со мной
              </Button>
              <Button onClick={() => scrollToSection("about")} variant="outline" size="lg">
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto animate-slide-up">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-primary text-center">Обо мне</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="mb-6 text-lg leading-relaxed">
                Финансовый директор с 15-летним опытом работы в международных корпорациях и технологических компаниях. 
                Специализируюсь на стратегическом финансовом планировании и консалтинге для топ-менеджмента.
              </p>
              <p className="text-lg leading-relaxed">
                Моя миссия — помогать компаниям выстраивать устойчивые финансовые системы, оптимизировать процессы 
                и достигать амбициозных бизнес-целей через грамотное управление ресурсами.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="competencies" className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-16 text-primary text-center">Ключевые компетенции</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {competencies.map((comp, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Icon name={comp.icon} className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-4 text-primary">{comp.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{comp.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-16 text-primary text-center">Опыт работы</h2>
          <div className="max-w-4xl mx-auto space-y-12">
            {experience.map((exp, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-accent">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-accent rounded-full"></div>
                <div className="mb-2 text-sm font-medium text-accent">{exp.period}</div>
                <h3 className="font-serif text-2xl font-semibold mb-1 text-primary">{exp.position}</h3>
                <div className="text-muted-foreground mb-4">{exp.company}</div>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <Icon name="CheckCircle2" className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="achievements" className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-16 text-primary text-center">Достижения</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="font-serif text-5xl md:text-6xl font-bold text-accent mb-3">
                  {achievement.number}
                </div>
                <div className="text-muted-foreground font-medium">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-primary text-center">
              Запись на консультацию
            </h2>
            <p className="text-lg text-muted-foreground mb-12 text-center">
              Заполните форму, и я свяжусь с вами для обсуждения вашего проекта
            </p>
            
            <Card className="p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Ваше имя</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ivan@example.com"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Телефон</label>
                  <Input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (900) 123-45-67"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Сообщение</label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Расскажите о вашем проекте и целях консультации"
                    className="w-full min-h-32"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                </Button>
              </form>
            </Card>

            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground mb-4">Или свяжитесь напрямую:</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a href="mailto:cfo@example.com" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                  <Icon name="Mail" className="w-5 h-5" />
                  <span>cfo@example.com</span>
                </a>
                <a href="tel:+79001234567" className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                  <Icon name="Phone" className="w-5 h-5" />
                  <span>+7 (900) 123-45-67</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2024 CFO Portfolio. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;