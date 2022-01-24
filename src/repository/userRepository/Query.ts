export const query = {

    customerDetails: `SELECT "username",
    "password",
    "user_id" FROM public."user_tbl" where username = {0} and password = {1}`,

    getArticles:`SELECT * FROM public."articles_tbl"`,

    getParticularArticles:`SELECT * FROM public."articles_tbl" where article_id = {0}`,

    insertUserDetails:`INSERT INTO public."user_tbl"("user_id", "username", "password")
	VALUES ({0}, {1}, {2}) returning *`,

    updateCustomerDetails:`UPDATE public."user_tbl" SET  "token" = {0}
	WHERE "user_id"={1} returning *`

}