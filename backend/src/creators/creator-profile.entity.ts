import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('creator_profiles')
export class CreatorProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  @Index('idx_cp_user_id')
  userId: string; // References Auth.js users.id (cuid format)

  @Column({ type: 'varchar', length: 30, unique: true })
  @Index('idx_cp_username')
  username: string; // Immutable, lowercase, alphanumeric + underscores

  @Column({ type: 'varchar', length: 100 })
  displayName: string;

  @Column({ type: 'text', nullable: true })
  bio: string | null;

  @Column({ type: 'varchar', length: 50 })
  @Index('idx_cp_category')
  category: string;

  @Column({ type: 'text', array: true, nullable: true })
  @Index('idx_cp_tags', { synchronize: false }) // GIN index created via migration
  tags: string[] | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Index('idx_cp_country')
  country: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  linkInstagram: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  linkTwitter: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  linkOnlyfans: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  linkWebsite: string | null;

  // SEO Fields
  @Column({ type: 'varchar', length: 60, nullable: true })
  seoTitle: string | null;

  @Column({ type: 'varchar', length: 160, nullable: true })
  seoDescription: string | null;

  @Column({ type: 'text', nullable: true })
  longBio: string | null;

  @Column({ type: 'smallint', default: 0 })
  backgroundTheme: number; // 0: Gradient, 1: Dots, 2: Waves, 3: Grid, 4: Minimal

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
