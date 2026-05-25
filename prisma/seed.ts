import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const exercises = [
  // Compound — Legs
  { name: "Back Squat", muscleGroup: "legs", category: "compound" },
  { name: "Front Squat", muscleGroup: "legs", category: "compound" },
  { name: "Romanian Deadlift", muscleGroup: "legs", category: "compound" },
  { name: "Conventional Deadlift", muscleGroup: "back", category: "compound" },

  // Compound — Push
  { name: "Bench Press", muscleGroup: "chest", category: "compound" },
  { name: "Incline Bench Press", muscleGroup: "chest", category: "compound" },
  { name: "Overhead Press", muscleGroup: "shoulders", category: "compound" },

  // Compound — Pull
  { name: "Barbell Row", muscleGroup: "back", category: "compound" },
  { name: "Pull-Up", muscleGroup: "back", category: "compound" },
  { name: "Lat Pulldown", muscleGroup: "back", category: "compound" },

  // Isolation
  { name: "Bicep Curl", muscleGroup: "arms", category: "isolation" },
  { name: "Tricep Pushdown", muscleGroup: "arms", category: "isolation" },
  { name: "Lateral Raise", muscleGroup: "shoulders", category: "isolation" },
  { name: "Leg Curl", muscleGroup: "legs", category: "isolation" },
  { name: "Calf Raise", muscleGroup: "legs", category: "isolation" },
];

async function main() {
  console.log("Seeding exercises...");

  for (const exercise of exercises) {
    await prisma.exercise.upsert({
      where: { name: exercise.name },
      update: {},
      create: exercise,
    });
  }

  console.log(`Seeded ${exercises.length} exercises.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });