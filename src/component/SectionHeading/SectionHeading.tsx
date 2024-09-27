const SectionHeading = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="dark:text-white text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default SectionHeading;
