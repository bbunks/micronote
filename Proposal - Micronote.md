Brenden Bunker

D424 - Capstone

# Proposal - Micronote

**Q:** Describe the business problem or opportunity, including the challenge customers encounter, and how the proposed software product will fulfill customer needs.

**A:** People often think in small lines of thought, whether it be a phone number you need to write down, a picture you want to save for later, or a link to something you want to learn. This is where Micronote comes in. Instead of dedicating pages to a single thought, Micronote works in short-form posts. This makes it easy to keep your thoughts written down. 

This idea has existed for a while in sticky notes. That is where the second innovation of Micronote comes in. Each time you create a note, you can add tags to it. These tags make it easy to search for your notes that relate to a subject or project. 

Finally, at the top of the app will be a search bar that lets you easily filter your notes. As you type, there will be recommendations for filters such as tags, attachments type, or if the title or text contains that phrase.



**Q:** Describe the software development life cycle methodology you will use to guide and support software development activities.

**A:** After the launch of the MVP, I plan on continuing to work on this project and add new features. For this reason, I have a KanBan board that has columns for backlog, current sprint, in progress, and completed. This is nice because as I have new ideas for features, I can easily add them to my backlog knowing that I can find that idea later and develop it then. This fits the agile model very well. Deliver Quickly, Deliver often.



**Q:** Describe the deliverables associated with *each* phase of the applied software development life cycle methodology. Describe the development plan for your software product, including the anticipated outcomes from development. Develop a projected timeline, including milestones, start and end dates, duration for *each* milestone, dependencies, and resources assigned to *each* activity.

**A:** The first sprint will focus on design. In this sprint, I will be creating the design for the UI of the web app. I will also create the ERD for the database. 

- Duration: 2 days
- Start: November 1, 2023
- End: November 2, 2023

The second sprint will focus on developing the front end components and scaffolding the web app. This will be good as I am comfortable in developing front ends.

- Duration: 3 days
- Start: November 3, 2023
- End: November 5, 2023

The third sprint will focus on developing the back end. This involves creating the api, implementing the ERD in spring, adding authentication and protecting data.

- Duration: 10 days
- Start: November 6, 2023
- End: November 16, 2023

The fourth sprint will focus on hooking the front end and the back end together. This will involve adding the login page to the front end, using the auth to query the back end and populate the stores that the front end uses to display data.

- Duration: 3 days
- Start: November 16, 2023
- End: November 19, 2023



**Q**: Justify the programming environments included in the development of the software product, including the following: any related costs, and the human resources that are necessary to execute *each* task.

**A:** For development, I will use the VS Code IDE for creating the front end and IntelliJ for the back end. Both of these IDEs are completely free to use.

 For the tech stack, I will use MySQL as the database. The production database will be hosted on PlanetScale. The development database is hosted locally and run using docker.

The back end will be written in Spring as it scales well and can serve the front end easily. It also creates a good developer experience. 

The front end will be written in React using tailwind. React is an industry-standard for SPA and PWA. I will be using a library I wrote for state management as I am comfortable in it and it has the features I require for this project.

I will use GitHub for storing the repo and the GitHub Actions to deploy the code automatically.

I plan on building the application to a Docker container and then deploying that on AWS app runner. To do this, I will create an Artifact Registry on AWS and upload all built docker containers to that for easy auto-deploying to AppRunner. 

There will be no human input required for anything other than developing the actual application as everything will be automated by GitHub Actions.

There will be costs associated upkeep of the app. AppRunner will cost 5 dollars a month to keep running and will scale up in pricing depending on usage. The domain for the app will cost 10 dollars a year. The first 5GB of data stored in the Planet Scale will be free and then 30 dollars a month after that. For labor, I will be the primary developer. I will work for 100% profit. The app currently has no form of monetization so the labor will be free. The app also does not have enough work to justify more than 1 or 2 people for the time being so it will be a side project.



**Q:** Explain how the proposed software product will be tested by doing the following: justify the methods for validating and verifying that the developed software product will meet customer needs, and explain how your test results will be analyzed.

 **A:** This product will be tested using Unit tests. For the front end, I will use Jest with react-testing-library to test the individual components. Then Spring has a unit testing library that will make this easy.

