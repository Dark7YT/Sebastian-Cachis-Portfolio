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
      { name: 'Java 17/21', icon: 'simple-icons:openjdk' },
      { name: 'Spring Boot 3', icon: 'simple-icons:spring' },
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
    ],
  },
  {
    id: 'architecture',
    items: [
      { name: 'DDD', icon: 'lucide:layers' },
      { name: 'CQRS', icon: 'lucide:layers' },
      { name: 'Microservicios', icon: 'lucide:layers' },
      { name: 'Event-driven', icon: 'lucide:zap' },
    ],
  },
  {
    id: 'data',
    items: [{ name: 'PostgreSQL', icon: 'simple-icons:postgresql' }],
  },
  {
    id: 'messaging',
    items: [
      { name: 'Apache Kafka', icon: 'simple-icons:apachekafka' },
      { name: 'RabbitMQ', icon: 'simple-icons:rabbitmq' },
    ],
  },
  {
    id: 'cloud',
    items: [
      { name: 'AWS S3', icon: 'simple-icons:amazonwebservices' },
      { name: 'Docker', icon: 'simple-icons:docker' },
      { name: 'Vercel', icon: 'lucide:cloud' },
    ],
  },
  {
    id: 'testing',
    items: [
      { name: 'JUnit 5', icon: 'lucide:check' },
      { name: 'Mockito', icon: 'lucide:check' },
    ],
  },
  {
    id: 'tools',
    items: [
      { name: 'Git', icon: 'simple-icons:git' },
      { name: 'GitHub', icon: 'simple-icons:github' },
    ],
  },
];
