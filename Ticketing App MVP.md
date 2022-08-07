# Ticketing App MVP

- Users can list a ticket for an event (concert, sports) for sale
- Other users can purchase this ticket
- Any user can list tickets for sale and purchase tickets
- When a user attempts to purchase a ticket, the ticket is 'locked' for 15 mins. The user has 15 mins to enter their payment info.
- While locked, no other user can purchase the ticket. After 15 minutes, the ticket should 'unlock'
- Ticket prices can be edited if they are not locked.

# Service Types

- auth: Everything related to user signup/signin/signout
- ticket: Ticket creation/editing. Knows whether a ticket can be updated
- orders: Order creation/editing
- expiration: Watches for orders to be created, cancels them after 15 mins
- payments: Handles credit card payments. Cancels orders if payment fails, completes if payment succeeds

# Resource Types / Database Schema

- Users:
  - id: int serial
  - email: string
  - password: string
- Orders:
  - id: int serial
  - userId: int ref to Users.id
  - status: enum ref to charges.status
  - ticketId: int ref to tickets.id
  - expiresAt: date type
- Tickets:
  - id: int serial
  - title: string
  - price: number
  - userId: int ref to users.id
  - orderId: int ref to orders.id
- Charges:
  - id: int serial
  - orderId: int ref to orders.id
  - status: string connect to orders.status
  - amount: number
  - stripeId: string
  - stripeRefundId: string

  