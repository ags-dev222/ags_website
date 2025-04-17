# User Story for Using the Application

## User Roles:
1. **Admin**: Full access to manage resources, events, blogs, and testimonials.
2. **Registered User**: Can create startups, RSVP to events, and access certain resources.
3. **Public User**: Can view blogs, events, and resources but has limited interaction capabilities.

## User Journey:

1. **User Registration and Signup**:
   - As a **Public User**, I want to create an account by providing my email, first name, last name, and phone number so that I can access additional features of the app.

2. **Creating a Blog Post**:
   - As an **Admin**, I want to create a new blog post by sending a POST request to `/api/blog/create` with the necessary details (title, content, author, tags, etc.) so that I can share updates and information.

3. **Viewing Blog Posts**:
   - As a **Public User**, I want to retrieve all blog posts by sending a GET request to `/api/blog/` so that I can read the latest articles and updates.

4. **Updating a Blog Post**:
   - As an **Admin**, I want to update an existing blog post by sending a PUT request to `/api/blog/update/{id}` with the updated content so that I can keep the information current.

5. **Deleting a Blog Post**:
   - As an **Admin**, I want to delete a blog post by sending a DELETE request to `/api/blog/{id}` so that I can remove outdated or irrelevant content.

6. **Creating a Startup**:
   - As a **Registered User**, I want to create a new startup by sending a POST request to `/api/startups/create` with the required details (name, description, sector, etc.) so that I can showcase my business idea.

7. **Viewing Startups**:
   - As a **Registered User**, I want to retrieve a list of all startups by sending a GET request to `/api/startups` so that I can explore new business opportunities.

8. **Updating a Startup**:
   - As an **Admin**, I want to update a startup's details by sending a PUT request to `/api/startups/{id}` with the updated information so that I can ensure the startup information is accurate.

9. **Deleting a Startup**:
   - As an **Admin**, I want to delete a startup by sending a DELETE request to `/api/startups/{id}` so that I can remove any startups that are no longer active.

10. **Creating an Event**:
    - As an **Admin**, I want to create a new event by sending a POST request to `/api/events/` with the event details (name, description, date, location) so that I can organize and promote events.

11. **RSVP to an Event**:
    - As a **Registered User**, I want to RSVP to an event by sending a POST request to `/api/events/{id}/rsvp` so that I can confirm my attendance.

12. **Viewing Resources**:
    - As a **Public User**, I want to retrieve a list of resources by sending a GET request to `/api/resources/` so that I can access helpful materials and information.

13. **Uploading a Resource**:
    - As an **Admin**, I want to upload a new resource by sending a POST request to `/api/resources/` with the resource details so that I can provide valuable content to users.

14. **Creating a Testimonial**:
    - As an **Admin**, I want to create a new testimonial for a startup by sending a POST request to `/api/testimonials` with the startup ID and content so that I can share positive feedback and experiences.

15. **Viewing Testimonials**:
    - As a **Public User**, I want to retrieve testimonials for a specific startup by sending a GET request to `/api/testimonials/:startupId` so that I can read reviews and feedback from other users.
