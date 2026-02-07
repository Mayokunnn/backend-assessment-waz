# Deploying to Render

This project is configured to deploy to [Render](https://render.com).

## Prerequisites

1. Create a Render account at https://render.com
2. Connect your GitHub repository to Render
3. Have your repository pushed to GitHub

## Deployment Steps

1. **Sign up on Render**: Go to https://render.com and create a free account

2. **Connect GitHub**: Link your GitHub account to Render

3. **Create New Service**:
   - Click "New" and select "Web Service"
   - Connect your repository
   - Render will automatically detect the `render.yaml` configuration

4. **Configure Environment Variables** (if not auto-populated):
   - `NODE_ENV`: production
   - `JWT_SECRET`: Use Render's "Generate" feature to create a secure random value
   - `DATABASE_URL`: Will be auto-configured if using Render's PostgreSQL
   - `JWT_EXPIRATION`: 7d
   - `THROTTLE_TTL`: 60
   - `THROTTLE_LIMIT`: 100

5. **Database Setup**:
   - The `render.yaml` file includes database configuration
   - Render will automatically provision a PostgreSQL database
   - Connection string is automatically injected

6. **Deploy**:
   - Click "Create" to deploy
   - Render will automatically:
     - Install dependencies (`npm install`)
     - Build the project (`npm run build`)
     - Run database migrations (`npx prisma migrate deploy`)
     - Start the application (`npm run start:prod`)

## Accessing Your Application

Once deployed, your application will be available at:
- Base URL: `https://your-service-name.onrender.com`
- API Docs: `https://your-service-name.onrender.com/api/docs`
- Root endpoint: `https://your-service-name.onrender.com/`

## Monitoring

- View logs in the Render dashboard
- Monitor health checks at the configured `/` endpoint
- Check performance metrics in the Render dashboard

## Important Notes

- **Free Tier**: Services spin down after 15 minutes of inactivity
- **Database**: PostgreSQL instance is included in the configuration
- **Secrets**: Always use Render's environment variable management for sensitive data
- **Build Time**: First deployment may take 5-10 minutes

## Troubleshooting

### Database Connection Issues
- Ensure `DATABASE_URL` is correctly set in environment variables
- Check that the database is running and accessible
- Review migration status: `npx prisma migrate status`

### Build Failures
- Check the Render build logs for specific errors
- Ensure all dependencies are in `package.json` and `package-lock.json` is committed
- Verify Node.js version in `.nvmrc` is compatible

### Application Not Starting
- Review application logs in Render dashboard
- Check environment variables are correctly set
- Verify the `render.yaml` configuration is valid

## Re-deploying

After pushing changes to GitHub:
1. Render will automatically detect changes in your repository
2. Click the "Deploy" button or go to the "Deploys" section
3. Select "Deploy latest commit" to start a new deployment

## Rolling Back

To rollback to a previous deployment:
1. Go to the "Deploys" section in your service
2. Find the previous successful deployment
3. Click "Redeploy" next to it

## Custom Domain

To add a custom domain:
1. Go to your service settings
2. In the "Custom Domain" section, add your domain
3. Update your DNS records according to Render's instructions
