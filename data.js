/* Portfolio-derived career data. See docs/SOURCE_NOTES.md for provenance. */
window.CAREER = {
 realms:[
 {id:'linux',name:'LINUX CITADEL',short:'Linux & Hosting',x:155,y:125,color:'#ba91ff',desc:'L3 Linux managed applications and hosting support at Liquid Web / Nexcess; RHCE Linux administration and infrastructure work at Rackspace.',skills:['Linux','RHEL','cPanel','Plesk','Apache','Nginx'],url:'https://blairyfairy.github.io/BlairPage/'},
 {id:'cloud',name:'CLOUD SPIRE',short:'Cloud & IaaS',x:500,y:95,color:'#70d9fa',desc:'Cloud support at UpCloud, AWS and OpenStack infrastructure, plus freelance cloud engineering.',skills:['AWS','OpenStack','EC2','S3','VPC','IaaS'],url:'https://blairyfairy.github.io/BlairPage/'},
 {id:'database',name:'DATA VAULT',short:'Database Engineering',x:845,y:125,color:'#ffb86b',desc:'Associate DBA technical services at Percona, supporting MySQL, MariaDB, Percona Server and MongoDB.',skills:['MySQL','MariaDB','Percona','MongoDB','Galera','Redis'],url:'https://blairyfairy.github.io/BlairPage/'},
 {id:'commerce',name:'COMMERCE PORT',short:'Web & E-commerce',x:155,y:425,color:'#f4a0c3',desc:'AWS, Magento, WordPress and WooCommerce work spanning infrastructure and application delivery.',skills:['WordPress','WooCommerce','Magento','PHP','Web Performance'],url:'https://blairyfairy.github.io/BlairPage/'},
 {id:'automation',name:'AUTOMATION FORGE',short:'DevOps & Reliability',x:500,y:455,color:'#a8f0ad',desc:'Production operations, automation, monitoring, troubleshooting and incident response across hosting and cloud.',skills:['Ansible','Docker','Kubernetes','Terraform','Monitoring','Incident Response'],url:'https://blairyfairy.github.io/BlairPage/'},
 {id:'origin',name:'ORIGIN GUILD',short:'Game Server Origins',x:845,y:425,color:'#f1d58a',desc:'Private Ragnarok Online game-server administrator and developer, 2005–2013, with server hosting and scripting experience.',skills:['Game Servers','Scripting','Server Administration','Community Operations'],url:'https://blairyfairy.github.io/BlairPage/'}
 ],
 jobs:[
 ['2021–2025','Liquid Web · Nexcess','L3 Linux Managed Applications & Hosting Support Engineer'],
 ['2019–2020','UpCloud','Technical Support Engineer (IaaS)'],
 ['2016','Percona','Associate DBA Technical Services Engineer'],
 ['2014–2016','Rackspace Technology','RHCE Linux Administrator / Cloud Ops / Infrastructure'],
 ['2005–2013','Private Ragnarok Online Servers','Game Server Administrator & Developer'],
 ['Apr 2026–Present','Upwork · Freelance','Full Stack AWS OpenStack Hybrid Cloud Data Ops Engineer'],
 ['2015–2016','craftartedu.com','AWS Magento E-Commerce Full Stack Developer'],
 ['2014–2016','SydneyKrey','AWS WooCommerce WordPress Full Stack Developer']
 ],
 credentials:[
 ['AWS / Credly','AWS knowledge and certification badges are featured in the source portfolio. Open the résumé for official verification links.','https://blairyfairy.github.io/BlairPage/#credly'],
 ['Linux Academy','71+ badges, labs and quizzes listed in the technical training section.','https://blairyfairy.github.io/BlairPage/'],
 ['Asana','Workflow Specialist and Administrator certifications listed as issued October 2026.','https://blairyfairy.github.io/BlairPage/'],
 ['University of the People','Business administration education; consult the original portfolio for precise degree status.','https://blairyfairy.github.io/BlairPage/'],
 ['MongoDB University','MongoDB training and course history.','https://blairyfairy.github.io/BlairPage/'],
 ['Rackspace Cloud University','Technical training in cloud, databases and e-commerce.','https://blairyfairy.github.io/BlairPage/']
 ],
 missions:[
 {id:'m1',realm:'linux',title:'The Unreachable Web Server',level:'Linux · Beginner',story:'A simulated web application returns connection refused. Which check is the best first diagnostic step?',answers:['Delete the application files and redeploy','Check service status, listening ports, and relevant logs','Disable the host firewall permanently'],correct:1,why:'Service status, socket listeners and logs help establish whether the issue is a stopped service, binding problem or network rule.'},
 {id:'m2',realm:'cloud',title:'The Broken Load Balancer',level:'AWS · Intermediate',story:'All targets in a simulated Application Load Balancer target group are unhealthy. What should you inspect first?',answers:['Health check path, target port, security groups and target responses','Immediately delete the load balancer','Turn off all VPC flow logging'],correct:0,why:'Validate the configured health check, target listener and network access before making broad changes.'},
 {id:'m3',realm:'database',title:'The Slow Query Vault',level:'Databases · Intermediate',story:'A MySQL-backed application slows after a new release. What is a strong first investigation?',answers:['Restart every server every minute','Remove all indexes','Review slow queries, execution plans and relevant metrics'],correct:2,why:'Query plans, slow-query logs and system metrics help identify regressions and bottlenecks.'},
 {id:'m4',realm:'commerce',title:'The Cache Labyrinth',level:'E-commerce · Intermediate',story:'A Magento storefront has stale pages after deployment. What is the safest response?',answers:['Disable TLS','Inspect cache layers and invalidate affected cache entries using the application deployment procedure','Purge the production database'],correct:1,why:'Identify which cache layer is stale and use targeted, documented invalidation.'},
 {id:'m5',realm:'automation',title:'The Reliability Trial',level:'Operations · Advanced',story:'A production incident is active. What is the best operational approach?',answers:['Change several systems at once without records','Ignore monitoring until customers complain','Establish impact, communicate, mitigate carefully and document the timeline'],correct:2,why:'Incident command emphasizes impact assessment, communication, controlled mitigation and learning.'}
 ]
};
