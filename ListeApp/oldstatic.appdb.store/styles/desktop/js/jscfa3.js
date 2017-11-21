function nice_time(seconds)
{
    var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    var numseconds = Math.floor((((seconds % 31536000) % 86400) % 3600) % 60);

    rs = '';
    if (numhours > 0)
    {
        rs += numhours + " hour";
        if (numhours != 1)
        {
            rs += "s";
        }
        rs += " ";
    }
    if (numminutes > 0)
    {
        rs += numminutes + " minute";
        if (numminutes != 1)
        {
            rs += "s";
        }
        rs += " ";
    }
    rs += numseconds + " second";
    if (numseconds != 1)
    {
        rs += "s";
    }

    return rs;
}

if (window.navigator.userAgent.match(/iPhone|iPod|iPad/)) {
    
}