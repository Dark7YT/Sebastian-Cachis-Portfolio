export type StackGroupId =
  | 'backend'
  | 'frontend'
  | 'architecture'
  | 'data'
  | 'messaging'
  | 'cloud'
  | 'testing'
  | 'tools';

export interface StackItem {
  name: string;
  icon?: string;
}

export interface StackGroup {
  id: StackGroupId;
  items: StackItem[];
}

export const stackGroups: StackGroup[] = [
  {
    id: 'backend',
    items: [
      { name: 'Java 8/17/21', icon: 'simple-icons:openjdk' },
      { name: 'Spring Boot 2/3', icon: 'simple-icons:spring' },
      { name: 'Spring Security', icon: 'simple-icons:spring' },
      { name: 'Spring Data JPA', icon: 'simple-icons:spring' },
      { name: 'Hibernate', icon: 'lucide:database' },
      { name: 'JWT', icon: 'lucide:lock' },
      { name: 'Maven', icon: 'lucide:layers' },
      { name: 'Python', icon: 'simple-icons:python' },
    ],
  },
  {
    id: 'frontend',
    items: [
      { name: 'Next.js 16', icon: 'simple-icons:nextdotjs' },
      { name: 'React', icon: 'simple-icons:react' },
      { name: 'Astro', icon: 'simple-icons:astro' },
      { name: 'TypeScript', icon: 'simple-icons:typescript' },
      { name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss' },
      { name: 'shadcn/ui', icon: 'lucide:layers' },
      { name: 'TanStack Query', icon: 'lucide:layers' },
      { name: 'React Hook Form', icon: 'lucide:layers' },
      { name: 'Zod', icon: 'lucide:check' },
      { name: 'Recharts', icon: 'lucide:layers' },
    ],
  },
  {
    id: 'architecture',
    items: [
      { name: 'DDD', icon: 'lucide:layers' },
      { name: 'CQRS', icon: 'lucide:layers' },
      { name: 'Hexagonal', icon: 'lucide:layers' },
      { name: 'Monolito Modular', icon: 'lucide:layers' },
      { name: 'SOLID', icon: 'lucide:check' },
      { name: 'Clean Code', icon: 'lucide:check' },
      { name: 'Event-driven', icon: 'lucide:zap' },
    ],
  },
  {
    id: 'data',
    items: [
      { name: 'PostgreSQL', icon: 'simple-icons:postgresql' },
      { name: 'MySQL', icon: 'lucide:database' },
      { name: 'MongoDB', icon: 'lucide:database' },
      { name: 'Flyway', icon: 'lucide:database' },
    ],
  },
  {
    id: 'messaging',
    items: [
      { name: 'RabbitMQ', icon: 'simple-icons:rabbitmq' },
      { name: 'Apache Kafka', icon: 'simple-icons:apachekafka' },
    ],
  },
  {
    id: 'cloud',
    items: [
      { name: 'AWS S3', icon: 'simple-icons:amazonwebservices' },
      { name: 'Docker', icon: 'simple-icons:docker' },
      { name: 'Docker Compose', icon: 'simple-icons:docker' },
      { name: 'GitHub Actions', icon: 'simple-icons:github' },
      { name: 'Vercel', icon: 'lucide:cloud' },
    ],
  },
  {
    id: 'testing',
    items: [
      { name: 'JUnit 5', icon: 'lucide:check' },
      { name: 'Mockito', icon: 'lucide:check' },
      { name: 'Spring Boot Test', icon: 'simple-icons:spring' },
      { name: 'MockMvc', icon: 'lucide:check' },
      { name: 'Testcontainers', icon: 'simple-icons:docker' },
    ],
  },
  {
    id: 'tools',
    items: [
      { name: 'Git', icon: 'simple-icons:git' },
      { name: 'GitHub', icon: 'simple-icons:github' },
      { name: 'GitFlow', icon: 'simple-icons:git' },
      { name: 'Jira', icon: 'lucide:layers' },
      { name: 'Postman', icon: 'lucide:layers' },
      { name: 'OpenAPI/Swagger', icon: 'lucide:code-2' },
    ],
  },
];
