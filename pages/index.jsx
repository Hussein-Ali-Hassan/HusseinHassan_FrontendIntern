import {
  Box,
  Text,
  Checkbox,
  Flex,
  Input,
  Divider,
  Button,
} from "@chakra-ui/react";

import useFormContext from "@/context/FormContext";
import Section from "@/components/Section";

export default function Home() {
  const { sections, setSections } = useFormContext();

  const addNewSection = () => {
    const newSections = JSON.parse(JSON.stringify(sections));

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
    const newSections = JSON.parse(JSON.stringify(sections));
    newSections = newSections.filter((_, idx) => idx !== index);

    setSections(newSections);
  };

  return (
    <Box maxWidth="830px" mx="auto" py="4rem">
      <Box mb="8">
        <Text fontSize="3xl">Create Questions</Text>
        <hr />
      </Box>
      <Box maxWidth="650px" mx="auto">
        {sections.map((section, index) => (
          <Box key={index}>
            {index > 0 && <SectionBreak />}
            <SectionHeader />
            <Section
              questions={section.questions}
              sectionIndex={index}
              addNewSection={addNewSection}
              deleteSection={deleteSection}
            />
          </Box>
        ))}
        <Flex justifyContent="end">
          <Button
            variant="outline"
            mr="4"
            onClick={() =>
              setSections([
                {
                  questions: [
                    {
                      type: "Single Choice",
                      positiveMarks: 0,
                      negativeMarks: 0,
                    },
                  ],
                },
              ])
            }
          >
            Discard
          </Button>
          <Button onClick={() => console.log(sections)}>Publish</Button>
        </Flex>
      </Box>
    </Box>
  );
}

function SectionHeader() {
  return (
    <Box boxShadow="md" p="6" mb="10" rounded="md">
      <Box pl="8" mb="12">
        <Input
          variant="unstyled"
          size="lg"
          fontSize="4xl"
          placeholder="Section Name"
        />
        <Input variant="unstyled" placeholder="Description (optional)" />
      </Box>
      <Checkbox colorScheme="brand" color="brand.900">
        Shuffle questions
      </Checkbox>
    </Box>
  );
}

function SectionBreak() {
  return (
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
  );
}
