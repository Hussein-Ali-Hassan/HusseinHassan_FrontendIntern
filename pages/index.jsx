import { Box, Text, Flex, Divider, Button } from "@chakra-ui/react";

import useFormContext from "@/context/FormContext";
import Section from "@/components/Section";

export default function Home() {
  const { sections, setSections } = useFormContext();

  const addNewSection = () => {
    const newSections = [...sections];

    newSections.push({
      questions: [
        {
          type: "Single Choice",
          positiveMarks: 0,
          negativeMarks: 0,
        },
      ],
    });

    setSections(newSections);
  };

  const deleteSection = (index) => {
    const newSections = [...sections];
    newSections = newSections.filter((_, idx) => idx !== index);

    setSections(newSections);
  };

  return (
    <Box maxWidth="830px" mx="auto" py="10">
      <Box mb="8">
        <Text fontSize="3xl">Create Questions</Text>
        <hr />
      </Box>
      <Box maxWidth="650px" mx="auto">
        {sections.map((section, index) => (
          <Box key={index}>
            {index > 0 && (
              <Flex
                color="brand.800"
                alignItems="center"
                justifyContent="space-between"
                my="10"
              >
                <Divider />
                <Text className="nowrap" fontSize="2xl" px="6">
                  Section Break
                </Text>
                <Divider />
              </Flex>
            )}
            <Box boxShadow="md" p="6" mb="6" rounded="md">
              <h1>Section Name</h1>
              <p>Description (optional)</p>
              <p>Shuffle questions</p>
            </Box>
            <Section
              questions={section.questions}
              sectionIndex={index}
              addNewSection={addNewSection}
              deleteSection={deleteSection}
            />
          </Box>
        ))}
        <Flex justifyContent="end">
          <Button colorScheme="brand" onClick={() => console.log(sections)}>
            Publish
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
