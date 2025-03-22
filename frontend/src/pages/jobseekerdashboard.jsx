import React, { useState } from "react";
import {
  Button,
  Container,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  List,
  ListItem,
  InputGroup,
  InputLeftElement,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function JobSeekerDashboard() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    contact: "",
    field: "",
  });

  const [displayProfile, setDisplayProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [workExperience, setWorkExperience] = useState([]);
  const [jobSearch, setJobSearch] = useState("");
  const [availableJobs, setAvailableJobs] = useState([
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Innovations Inc.",
      location: "Kampala, UG",
    },
    {
      id: 2,
      title: "Marketing Manager",
      company: "Global Marketing Solutions",
      location: "Mombasa, Kenya",
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "Data Insights Ltd.",
      location: "Fort Portal, UG",
    },
    {
      id: 4,
      title: "Web Developer",
      company: "WebCraft Studios",
      location: "Jinja, UG",
    },
    {
      id: 5,
      title: "Project Manager",
      company: "Project Dynamics Corp.",
      location: "Kigali,Rwanda",
    },
      {
      id: 6,
      title: "Graphic Designer",
      company: "Design Hub",
      location: "Jubah, South Sudan",
    },
  ]);
  const navigate = useNavigate();

  const handleSaveProfile = () => {
    setDisplayProfile({ ...profile });
    setIsEditing(false);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      { jobTitle: "", company: "", startDate: "", endDate: "" },
    ]);
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index][field] = value;
    setWorkExperience(newWorkExperience);
  };

  const filteredJobs = availableJobs.filter((job) =>
    job.title.toLowerCase().includes(jobSearch.toLowerCase())
  );

  const handleSetProfile = () => {
    setDisplayProfile({ ...profile });
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  return (
    <Container maxW="1200px" p={4}>
      <Grid templateColumns={{ base: "1fr", md: "1fr 2fr 1fr" }} gap={6}>
        {/* Profile Section (Left) */}
        <GridItem>
          <Box boxShadow="md" p={6} borderRadius="md">
            <Heading size="md" mb={4}>
              Your Profile
            </Heading>
            {isEditing ? (
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    placeholder="Enter your name"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    placeholder="Enter your email"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Contact</FormLabel>
                  <Input
                    type="tel"
                    name="contact"
                    value={profile.contact}
                    onChange={handleProfileChange}
                    placeholder="Enter your contact"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Field</FormLabel>
                  <Input
                    type="text"
                    name="field"
                    value={profile.field}
                    onChange={handleProfileChange}
                    placeholder="Enter your field"
                  />
                </FormControl>
                <Button onClick={handleSaveProfile} colorScheme="blue">
                  Save Profile
                </Button>
              </Stack>
            ) : displayProfile ? (
              <Box>
                <Text>Name: {displayProfile.name}</Text>
                <Text>Email: {displayProfile.email}</Text>
                <Text>Contact: {displayProfile.contact}</Text>
                <Text>Field: {displayProfile.field}</Text>
                <Button onClick={handleEditProfile} mt={4} colorScheme="teal">
                  Edit Profile
                </Button>
              </Box>
            ) : (
              <Button onClick={handleSetProfile} colorScheme="green">
                Set Profile
              </Button>
            )}
          </Box>
        </GridItem>

        {/* Jobs Section (Center) */}
        <GridItem>
          <Box boxShadow="md" p={6} borderRadius="md">
            <Heading size="md" mb={4}>
              Search for Jobs
            </Heading>
            <InputGroup mb={4}>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                type="text"
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                placeholder="Search for jobs..."
              />
            </InputGroup>
            <List spacing={4}>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <ListItem
                    key={job.id}
                    p={4}
                    borderWidth={1}
                    borderRadius="md"
                    boxShadow="sm"
                  >
                    <Heading size="sm">{job.title}</Heading>
                    <Text>{job.company}</Text>
                    <Text>{job.location}</Text>
                    <Button
                      mt={2}
                      colorScheme="blue"
                      size="sm"
                      onClick={() => navigate(`/job/${job.id}`)}
                    >
                      View Job
                    </Button>
                  </ListItem>
                ))
              ) : (
                <Text>No jobs found</Text>
              )}
            </List>
          </Box>
        </GridItem>

        {/* Work Experience Section (Right) */}
        <GridItem>
          <Box boxShadow="md" p={6} borderRadius="md">
            <Heading size="md" mb={4}>
              Work Experience
            </Heading>
            <Button
              onClick={handleAddWorkExperience}
              colorScheme="blue"
              mb={4}
            >
              Add Experience
            </Button>
            <Stack spacing={4}>
              {workExperience.map((exp, index) => (
                <Box key={index} p={4} borderWidth={1} borderRadius="md">
                  <FormControl>
                    <FormLabel>Job Title</FormLabel>
                    <Input
                      type="text"
                      value={exp.jobTitle}
                      onChange={(e) =>
                        handleWorkExperienceChange(
                          index,
                          "jobTitle",
                          e.target.value
                        )
                      }
                      placeholder="Job Title"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Company</FormLabel>
                    <Input
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        handleWorkExperienceChange(
                          index,
                          "company",
                          e.target.value
                        )
                      }
                      placeholder="Company"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Start Date</FormLabel>
                    <Input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) =>
                        handleWorkExperienceChange(
                          index,
                          "startDate",
                          e.target.value
                        )
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>End Date</FormLabel>
                    <Input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) =>handleWorkExperienceChange(
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                      />
                    </FormControl>
                  </Box>
                ))}
              </Stack>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    );
  }
  
  export default JobSeekerDashboard;