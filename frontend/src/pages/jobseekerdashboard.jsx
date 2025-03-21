import React, { useState } from "react";
import { Button, Container, Box, FormControl, FormLabel, Input, Textarea, Stack, HStack, Heading, Text, List, ListItem, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

// Dummy data for job listings (This should be fetched from an API in a real application)
const availableJobs = [
  { id: 1, title: "Software Developer", company: "TechCorp", location: "Remote" },
  { id: 2, title: "Data Scientist", company: "DataCorp", location: "New York, NY" },
  { id: 3, title: "UI/UX Designer", company: "DesignWorks", location: "San Francisco, CA" },
  // Add more jobs here
];

function JobSeekerDashboard() {
    console.log('running')
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    contact: "",
    field: "",
  });

  const [workExperience, setWorkExperience] = useState([]);
  const [jobSearch, setJobSearch] = useState("");
  const navigate = useNavigate();

  // Handle Profile Updates
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Add work experience
  const handleAddWorkExperience = () => {
    setWorkExperience([...workExperience, { jobTitle: "", company: "", startDate: "", endDate: "" }]);
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index][field] = value;
    setWorkExperience(newWorkExperience);
  };

  // Handle Job Search
  const filteredJobs = availableJobs.filter((job) => job.title.toLowerCase().includes(jobSearch.toLowerCase()));

  return (
    <Container maxW="1200px" p={4}>
      <Box boxShadow="md" p={6} borderRadius="md" mb={6}>
        <Heading size="lg" mb={4}>Job Seeker Dashboard</Heading>

        {/* Profile Update Section */}
        <Box mb={8}>
          <Heading size="md" mb={2}>Update Your Profile</Heading>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={profile.name} onChange={handleProfileChange} placeholder="Enter your name" />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" value={profile.email} onChange={handleProfileChange} placeholder="Enter your email" />
            </FormControl>
            <FormControl>
              <FormLabel>Contact Number</FormLabel>
              <Input type="tel" name="contact" value={profile.contact} onChange={handleProfileChange} placeholder="Enter your contact number" />
            </FormControl>
            <FormControl>
              <FormLabel>Field</FormLabel>
              <Input type="text" name="field" value={profile.field} onChange={handleProfileChange} placeholder="Enter your field (e.g., Software Development)" />
            </FormControl>
          </Stack>
        </Box>

        {/* Work Experience Section */}
        <Box mb={8}>
          <Heading size="md" mb={2}>Work Experience</Heading>
          <Button onClick={handleAddWorkExperience} colorScheme="blue" mb={4}>Add Work Experience</Button>
          <Stack spacing={4}>
            {workExperience.map((exp, index) => (
              <Box key={index} p={4} borderWidth={1} borderRadius="md" mb={4}>
                <FormControl>
                  <FormLabel>Job Title</FormLabel>
                  <Input type="text" value={exp.jobTitle} onChange={(e) => handleWorkExperienceChange(index, "jobTitle", e.target.value)} placeholder="Job Title" />
                </FormControl>
                <FormControl>
                  <FormLabel>Company</FormLabel>
                  <Input type="text" value={exp.company} onChange={(e) => handleWorkExperienceChange(index, "company", e.target.value)} placeholder="Company" />
                </FormControl>
                <FormControl>
                  <FormLabel>Start Date</FormLabel>
                  <Input type="date" value={exp.startDate} onChange={(e) => handleWorkExperienceChange(index, "startDate", e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>End Date</FormLabel>
                  <Input type="date" value={exp.endDate} onChange={(e) => handleWorkExperienceChange(index, "endDate", e.target.value)} />
                </FormControl>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Job Search Section */}
      <Box boxShadow="md" p={6} borderRadius="md">
        <Heading size="md" mb={4}>Search for Jobs</Heading>
        <InputGroup mb={4}>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input
            type="text"
            value={jobSearch}
            onChange={(e) => setJobSearch(e.target.value)}
            placeholder="Search for jobs..."
          />
        </InputGroup>

        {/* Display filtered job listings */}
        <List spacing={4}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <ListItem key={job.id} p={4} borderWidth={1} borderRadius="md" boxShadow="sm">
                <Heading size="sm">{job.title}</Heading>
                <Text>{job.company}</Text>
                <Text>{job.location}</Text>
                <Button mt={2} colorScheme="blue" size="sm" onClick={() => navigate.push(`/job/${job.id}`)}>View Job</Button>
              </ListItem>
            ))
          ) : (
            <Text>No jobs found</Text>
          )}
        </List>
      </Box>
    </Container>
  );
}

export default JobSeekerDashboard;
