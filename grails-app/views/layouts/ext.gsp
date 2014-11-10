<!DOCTYPE html>
<html>
<head>
    <title>Jalopy Exchange</title>
    <link rel="stylesheet" type="text/css" href="${resource(dir: 'javascripts', file: 'extjs/packages/ext-theme-neptune/build/resources/ext-theme-neptune-all.css')}">
    <asset:stylesheet src="jalopy.css"/>

    <asset:javascript src="extjs/ext-all-debug.js"/>

    <script type="text/javascript">
        JE = {};
        %{--JE.User = {--}%
            %{--username : "<sec:loggedInUserInfo field="username"/>",--}%
        %{--};--}%
        JE.USERNAME = '<sec:loggedInUserInfo field="username"/>';
        <sec:access expression="hasRole('ROLE_ADMIN')">
        JE.ADMIN = true;
        </sec:access>
        JE.CONTEXT = "<%=applicationContext.servletContext.contextPath %>";
    </script>

    <asset:javascript src="jalopy/overrides/extjsSetup.js"/>
    <g:layoutHead/>

</head>
<body></body>
</html>
