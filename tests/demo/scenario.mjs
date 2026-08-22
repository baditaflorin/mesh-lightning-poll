export default async (a, b) => {
  await a.getByRole("button", { name: /Go for it/ }).click();
  await a.waitForTimeout(900);
  await b.getByRole("button", { name: /Need context/ }).click();
  await b.waitForTimeout(900);
  await a.getByRole("button", { name: "Change my answer" }).click();
  await a.getByRole("button", { name: /Not now/ }).click();
  await a.waitForTimeout(2200);
};
