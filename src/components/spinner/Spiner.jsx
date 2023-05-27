import { Spinner, Box } from "@chakra-ui/react";

const Spiner = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Spinner size="xl" color="red.500" />
    </Box>
  );
};

export default Spiner;
