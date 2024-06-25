import { error } from "console";
import { randomUUID } from "crypto";
import { datetime } from "drizzle-orm/mysql-core";
import { Context, Hono, Next } from "hono";
import { basicAuth } from "hono/basic-auth";
import { getCookie, setCookie } from "hono/cookie";
import { JwtVariables, decode, jwt, sign, verify } from "hono/jwt";

type Variables = JwtVariables

const Users = new Hono<{Variables: Variables}>();

Users.route("/user")
.get("/*", async (ctx) => {
    const token = getCookie(ctx, "jwtAuth")
    try {
        const res = await verify(token!,"super-secret")
        console.log(res.name)
        return ctx.text("Hello User")
    } catch (error) {
        console.error("Token not valid")
        return ctx.redirect('/login')
    }
})

const CreateJWT = async function (ctx: Context, next: Next) {
    try {
        const newJWT = await sign({
                name: "username",
                role: "user",
                exp: Math.floor(Date.now() / 1000) * 60 * 10
            }, 
            "super-secret"
        )
        setCookie(ctx, "jwtAuth", newJWT)
        next()
    } catch (error: any) {
        return ctx.text(error, 500)
    }
}

Users.get("/login", async (c) => {
    return c.html(`<form method="post" action="/login">
            <h1>Account Login</h1>
            <button>login</button>
        </section>`)
})
.post("/login", CreateJWT, (c) => {
    return c.redirect("/user")
})


export default Users;