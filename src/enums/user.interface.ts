import { Users } from '@/models/users.entity'
import { Request } from 'express'

interface RequestWithUser extends Request {
  user: Users
}

export default RequestWithUser
