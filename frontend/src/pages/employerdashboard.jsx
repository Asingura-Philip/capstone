import React, { useState, useEffect } from "react";
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
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EmployerDashboard() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    contact: "",
    company: "",
  });

  const [displayProfile, setDisplayProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [postedJobs, setPostedJobs] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    location: "",
    company: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch posted jobs from backend
    axios.get("http://localhost:4040/employer/jobs")
      .then((response) => {
        setPostedJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posted jobs:", error);
      });

    // Fetch job applications from backend
    axios.get("http://localhost:4040/employer/applications")
      .then((response) => {
        setJobApplications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job applications:", error);
      });
  }, []);

  const handleSaveProfile = () => {
    setDisplayProfile({ ...profile });
    setIsEditing(false);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePostJob = () => {
    axios.post('http://localhost:4040/employer/jobs', newJob)
      .then((response) => {
        setPostedJobs([...postedJobs, response.data]);
        setNewJob({
          title: "",
        //   description: "",
          location: "",
          company: "",
        });
      })
      .catch((error) => {
        console.error("Error posting job:", error);
      });
  };

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
                  <FormLabel>Company</FormLabel>
                  <Input
                    type="text"
                    name="company"
                    value={profile.company}
                    onChange={handleProfileChange}
                    placeholder="Enter your company name"
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
                <Text>Company: {displayProfile.company}</Text>
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

        {/* Job Posting Section (Center) */}
        <GridItem>
          <Box boxShadow="md" p={6} borderRadius="md">
            <Heading size="md" mb={4}>
              Post a New Job
            </Heading>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Job Title</FormLabel>
                <Input
                  type="text"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  placeholder="Enter job title"
                />
              </FormControl>
              {/* <FormControl>
                <FormLabel>Job Description</FormLabel>
                <Input
                  type="text"
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  placeholder="Enter job description"
                />
              </FormControl> */}
              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input
                  type="text"
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                  placeholder="Enter job location"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Company</FormLabel>
                <Input
                  type="text"
                  value={newJob.company}
                  onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                  placeholder="Enter company name"
                />
              </FormControl>
              <Button onClick={handlePostJob} colorScheme="blue">
                Post Job
              </Button>
            </Stack>
          </Box>
        </GridItem>

        {/* Applications Section (Right) */}
        <GridItem>
          <Box boxShadow="md" p={6} borderRadius="md">
            <Heading size="md" mb={4}>
              Job Applications
            </Heading>
            <List spacing={4}>
              {jobApplications.length > 0 ? (
                jobApplications.map((application) => (
                  <ListItem
                    key={application.id}
                    p={4}
                    borderWidth={1}
                    borderRadius="md"
                    boxShadow="sm"
                  >
                    <Heading size="sm">{application.jobTitle}</Heading>
                    <Text>Applicant: {application.applicantName}</Text>
                    <Text>Email: {application.applicantEmail}</Text>
                    <Button
                      mt={2}
                      colorScheme="blue"
                      size="sm"
                      onClick={() => navigate(`/application/${application.id}`)}
                    >
                      View Application
                    </Button>
                  </ListItem>
                ))
              ) : (
                <Text>No applications yet</Text>
              )}
            </List>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
}

export default EmployerDashboard;

