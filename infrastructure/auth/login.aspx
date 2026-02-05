<%@ Page Language="C#" %>
<%@ Import Namespace="System.Web.Security" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<script runat="server">
public void Login_OnClick(object sender, EventArgs args)
{
   if (FormsAuthentication.Authenticate(UsernameTextbox.Text, PasswordTextbox.Text))
      FormsAuthentication.RedirectFromLoginPage(UsernameTextbox.Text, NotPublicCheckBox.Checked);
   else
     Msg.Text = "Login failed. Please check your user name and password and try again.";
}
</script>
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
  <title>Login</title>
  <link rel="stylesheet" href="./login.css"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<div class="login-page">
    
  <div class="form">
    <form class="login-form" id="form1" runat="server">
      <asp:Label id="Msg" runat="server" class="error" />
      <asp:Textbox id="UsernameTextbox" runat="server" placeholder="name" />
      <asp:Textbox placeholder="password" id="PasswordTextbox" runat="server" TextMode="Password" />
      <asp:Button id="LoginButton" Text="Login" OnClick="Login_OnClick" runat="server" />
      <p class="message"><label><asp:CheckBox id="NotPublicCheckBox" runat="server" /> Check here if this is <span style="text-decoration:underline">not</span> a public computer.</label></p>
    </form>
  </div>
</div>

</body>
</html>