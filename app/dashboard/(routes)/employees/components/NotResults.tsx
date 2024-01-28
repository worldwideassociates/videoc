interface Props {}

export const NoResults: React.FC<Props> = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <p className="text-muted-foreground text-xl">No Results</p>
    </div>
  );
};
