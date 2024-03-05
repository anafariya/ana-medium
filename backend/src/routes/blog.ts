
import { createPostInput, updatePostInput } from "@anafariya/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify, decode } from 'hono/jwt'

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET : string
	},
	Variables : {
		userId: string
	}
}>()


blogRouter.use('/*', async (c, next) => {
	const authHeader = c.req.header("authorization")||""
	const user = await verify(authHeader, c.env.JWT_SECRET)
	if(user) {
		c.set("userId", user.id)
		await next()
	}
	else{
		c.status(403)
		return c.json({
			message: "You are not logged in"
		})
	}
  })
  
  
blogRouter.post('/', async (c) => {
	const body = await c.req.json();
	const authorId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const { success } = createPostInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}

	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: authorId
		}
	});
	return c.json({
		id: post.id
	});
})


blogRouter.put('/', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = updatePostInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}

	prisma.post.update({
		where: {
			id: body.id		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});
    
  blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const posts = await prisma.post.findMany({
		select: {
			content: true,
			title: true,
			id: true,
			author:{
				select:{
					name:true
				}
			}
		}
	});

	return c.json({posts});
})
  
  blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findFirst({
		where: {
			id : id
		},
		select: {
			id:true,
			title: true,
			content: true,
			author:{
				select:{
					name:true
				}
			}
		}
	});

	return c.json(post);
})

blogRouter.get('/', async (c) => {
	const body = await c.req.json()
	const prisma = new PrismaClient({
		datasourceUrl:c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	try {
		const blog = await prisma.post.findFirst({
			where: {
				id: body.id
			},
		})
		return c.json({
			blog
		})
	}
	catch (e) {
		c.status(411)
		return c.json({
			message: "Error while fetching blog post"
		})
	}
})
