import { revalidatePath } from "next/cache";

export function revalidateSite() {
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/services");
  revalidatePath("/industries");
  revalidatePath("/testimonials");
  revalidatePath("/contact");
  revalidatePath("/team");
  revalidatePath("/admin", "layout");
}
