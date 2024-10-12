async function deleteActivity() {
  // Delete the activity from the database
  await prisma.activity.delete({
    where: { id: activityId },
  });

  console.log("halo");
}

export default deleteActivity;
