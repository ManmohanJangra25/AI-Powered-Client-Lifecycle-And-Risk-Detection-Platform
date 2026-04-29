const calculateProfit = (project) => {
  const hours = Number(project.hoursWorked || 0);

  const rate = Number(
    project.customRate !== undefined && project.customRate !== null
      ? project.customRate
      : project.hourlyRate,
  );

  const costPerHour = Number(project.costPerHour || 0);

  const revenue = rate * hours;
  const cost = costPerHour * hours;

  if (!revenue || revenue === 0) return "0.00";

  const profitPercent = ((revenue - cost) / revenue) * 100;

  return profitPercent.toFixed(2);
};

const calculateDedicatedProfit = (resource) => {
  const workingDays = 20;

  const hours = resource.allocatedHours || resource.hoursPerDay * workingDays;

  const revenue = resource.monthlyCost;
  const cost = hours * 10; // Our Internal Cost

  if (!revenue || revenue === 0) return "0.00";

  return (((revenue - cost) / revenue) * 100).toFixed(2);
};

module.exports = { calculateProfit, calculateDedicatedProfit };
